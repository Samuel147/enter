# Bug 修复记录

## 问题描述

### 问题 1：登录 API 500 错误

在启动 Next.js 开发服务器后，登录功能无法正常工作，返回 500 错误。

#### 错误日志
```
POST /api/auth/login 401 in 391ms
POST /api/auth/login 500 in 18ms
POST /api/auth/login 500 in 9ms
```

#### 根本原因

在服务器端代码中使用了 `localStorage`，但 `localStorage` 是浏览器 API，不能在 Node.js 服务器环境中使用。

#### 问题文件
- `src/lib/auth.ts` - 使用了 `localStorage.setItem()` 和 `localStorage.getItem()`

#### 修复方案

**1. 修改认证逻辑**

将基于 `localStorage` 的存储改为基于内存的 Map 存储。

**修改前：**
```typescript
let currentUser: User | null = null;

export async function login(studentId: string, password: string, role: 'student' | 'teacher') {
  // ...
  localStorage.setItem('user', JSON.stringify(student));
  // ...
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user');
  // ...
}
```

**修改后：**
```typescript
const userSessions = new Map<string, User>();

export async function login(studentId: string, password: string, role: 'student' | 'teacher') {
  // ...
  const sessionId = Date.now().toString();
  userSessions.set(sessionId, student);
  return { success: true, user: { ...student, sessionId } };
}

export function getCurrentUser(sessionId?: string): User | null {
  if (sessionId) {
    return userSessions.get(sessionId) || null;
  }
  return null;
}
```

**2. 更新类型定义**

在 `User` 接口中添加 `sessionId` 字段：

```typescript
export interface User {
  // ... 其他字段
  sessionId?: string;
}
```

### 问题 2：路由 404 错误

#### 错误日志
```
GET /student/dashboard 404 in 65ms
```

#### 根本原因

Next.js 的路由组 `(student)` 在 Windows 文件系统中存在兼容性问题。Next.js 14 的 App Router 在 Windows 上处理带有括号的目录名时可能出现问题。

#### 问题表现
- `/login` 路由正常工作（使用 `(auth)` 路由组）
- `/student/dashboard` 返回 404（使用 `(student)` 路由组）
- Next.js 编译时只识别了部分路由

#### 修复方案

**方法 1：使用普通文件夹名（推荐）**

将路由组目录名从带括号的形式改为不带括号的形式：

```bash
# 修改前
app/(auth)
app/(student)
app/(teacher)

# 修改后
app/auth
app/student
app/teacher
```

**方法 2：保留路由组但确保目录结构正确**

如果需要使用路由组（用于布局共享），确保：
1. 路由组目录名使用圆括号 `(name)`
2. URL 路径中不包含括号
3. 每个路由组都有自己的 `layout.tsx`

#### 实施步骤

```powershell
# 复制路由组到普通目录
Copy-Item -Path 'app/(auth)' -Destination 'app/auth' -Recurse -Force
Copy-Item -Path 'app/(student)' -Destination 'app/student' -Recurse -Force
Copy-Item -Path 'app/(teacher)' -Destination 'app/teacher' -Recurse -Force

# 删除旧的带括号的目录（可选）
Remove-Item -Path 'app/(auth)' -Recurse -Force
Remove-Item -Path 'app/(student)' -Recurse -Force
Remove-Item -Path 'app/(teacher)' -Recurse -Force
```

#### 注意事项

1. **Windows 文件系统限制**：Windows 可能对某些特殊字符（包括括号）在目录名中的处理有限制

2. **路由组 vs 普通目录**：
   - 路由组 `(name)`：用于布局共享，不影响 URL 路径
   - 普通目录 `name`：直接成为 URL 路径的一部分

3. **兼容性考虑**：如果项目需要在多个平台（Windows/macOS/Linux）上运行，建议使用普通目录名

## 其他修复

### API 导入问题

在 `src/app/api/approvals/route.ts` 中修复了重复导入：

**修改前：**
```typescript
import { mockApplications, mockApprovalHistory } from '@/data/mock-applications';
import { mockApprovalHistory as mockHistory } from '@/data/mock-approvals';
```

**修改后：**
```typescript
import { mockApplications } from '@/data/mock-applications';
import { mockApprovalHistory } from '@/data/mock-approvals';
```

### 配置文件更新

- `tailwind.config.ts` - 添加了 `app` 目录到内容扫描路径
- `start.bat` - 使用 PowerShell 运行 npm 命令以避免路径问题

### 端口占用问题

**问题**：端口 3000 被占用

**解决方案**：
```powershell
# 查找占用端口的进程
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess

# 停止进程
Stop-Process -Id <PID> -Force
```

或者让 Next.js 自动切换到其他端口（如 3001）。

### 项目目录结构问题

**问题**：`app` 目录在 `src/app` 和项目根目录都有，导致混淆

**解决方案**：
- 统一使用项目根目录的 `app` 目录
- 删除 `src/app` 目录

## 测试结果

### API 测试

1. **登录 API**
```bash
POST /api/auth/login
Body: {"studentId":"20241234567","password":"123456","role":"student"}
Result: ✅ success: True
```

2. **申请列表 API**
```bash
GET /api/applications
Result: ✅ success: True, 返回申请列表
```

3. **审批统计 API**
```bash
GET /api/approvals?type=stats
Result: ✅ success: True, 返回统计数据
```

### 页面测试

1. **首页**
```bash
GET /
Result: ✅ 200 OK
```

2. **登录页**
```bash
GET /login
Result: ✅ 200 OK
```

3. **学生仪表盘**（待修复）
```bash
GET /student/dashboard
Result: ❌ 404 Not Found
```

## 注意事项

1. **生产环境**
   - 当前使用内存存储，服务器重启后所有会话会丢失
   - 生产环境应使用 Redis 或数据库存储会话
   - 考虑使用 JWT token 进行身份验证

2. **安全性**
   - 密码验证应使用 bcrypt 等加密方式
   - 应添加 CSRF 保护
   - 应添加速率限制

3. **后续优化**
   - 实现真实的数据库集成
   - 添加文件上传功能
   - 添加邮件通知
   - 实现数据持久化
   - 修复路由组在 Windows 上的兼容性问题

4. **跨平台兼容性**
   - 路由组命名应避免使用特殊字符
   - 测试在 Windows/macOS/Linux 上的表现
   - 考虑使用 Docker 容器化部署

## 总结

### 已修复
- ✅ 登录接口（POST /api/auth/login）
- ✅ 申请列表（GET /api/applications）
- ✅ 创建申请（POST /api/applications）
- ✅ 审批统计（GET /api/approvals?type=stats）
- ✅ 审批操作（PUT /api/approvals）
- ✅ 端口占用问题

### 待修复
- ⚠️ 学生端路由（/student/*）
- ⚠️ 教师端路由（/teacher/*）
- ⚠️ 路由组在 Windows 上的兼容性

### 建议

1. **短期**：将路由组改为普通目录名，确保路由正常工作
2. **中期**：实现真实的后端集成和会话管理
3. **长期**：考虑跨平台部署和容器化

项目基本功能已经可以使用，登录和 API 接口都正常工作。路由问题可以通过修改目录结构解决。

