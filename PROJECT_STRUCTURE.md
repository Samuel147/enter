# 新生入学管理系统 - 项目目录结构

```
enrollment-system/
├── .next/                    # Next.js 构建输出目录（自动生成）
├── node_modules/             # 依赖包（自动生成）
├── public/                   # 静态资源目录
│   └── images/              # 图片资源
├── src/
│   ├── app/                 # App Router 目录
│   │   ├── api/            # API 路由
│   │   │   ├── auth/       # 认证相关 API
│   │   │   │   └── login/
│   │   │   │       └── route.ts
│   │   │   ├── applications/ # 申请相关 API
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   └── approvals/   # 审批相关 API
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── (auth)/         # 认证路由组
│   │   │   └── login/      # 登录页面
│   │   │       └── page.tsx
│   │   ├── (student)/      # 学生端路由组
│   │   │   ├── dashboard/  # 学生仪表盘
│   │   │   │   └── page.tsx
│   │   │   ├── applications/ # 我的申请
│   │   │   │   └── page.tsx
│   │   │   ├── new-application/ # 新建申请
│   │   │   │   └── page.tsx
│   │   │   └── profile/    # 个人信息
│   │   │       └── page.tsx
│   │   ├── (teacher)/      # 教师端路由组
│   │   │   ├── approval/   # 审批中心
│   │   │   │   └── page.tsx
│   │   │   ├── history/    # 审批历史
│   │   │   │   └── page.tsx
│   │   │   ├── students/   # 学生管理
│   │   │   │   └── page.tsx
│   │   │   └── statistics/ # 数据统计
│   │   │       └── page.tsx
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 首页（重定向到登录）
│   ├── components/         # 可复用组件
│   │   ├── auth/           # 认证相关组件
│   │   │   ├── LoginForm.tsx
│   │   │   └── RoleSwitch.tsx
│   │   ├── student/         # 学生端组件
│   │   │   ├── StudentSidebar.tsx
│   │   │   ├── StudentHeader.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   ├── TimelineItem.tsx
│   │   │   └── ApplicationCard.tsx
│   │   ├── teacher/        # 教师端组件
│   │   │   ├── TeacherSidebar.tsx
│   │   │   ├── TeacherHeader.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── ApprovalCard.tsx
│   │   │   └── StudentTable.tsx
│   │   ├── common/         # 通用组件
│   │   │   ├── Modal.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Select.tsx
│   │   └── ui/             # UI 基础组件
│   │       ├── Card.tsx
│   │       └── Badge.tsx
│   ├── lib/                # 工具库
│   │   ├── api.ts          # API 客户端
│   │   ├── auth.ts         # 认证工具
│   │   ├── utils.ts        # 通用工具函数
│   │   └── constants.ts    # 常量定义
│   ├── types/              # TypeScript 类型定义
│   │   ├── user.ts         # 用户类型
│   │   ├── application.ts  # 申请类型
│   │   └── approval.ts     # 审批类型
│   └── data/               # 模拟数据
│       ├── mock-users.ts   # 模拟用户数据
│       ├── mock-applications.ts # 模拟申请数据
│       └── mock-approvals.ts    # 模拟审批数据
├── .gitignore             # Git 忽略文件
├── next.config.js         # Next.js 配置
├── package.json           # 项目依赖
├── tailwind.config.js     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
└── pnpm-lock.yaml         # pnpm 锁文件（自动生成）
```

## 目录说明

### 路由组 (Route Groups)
- `(auth)` - 认证相关页面，无需侧边栏
- `(student)` - 学生端页面，共享学生侧边栏
- `(teacher)` - 教师端页面，共享教师侧边栏

### API 路由
- `/api/auth/*` - 用户认证相关
- `/api/applications/*` - 学生申请 CRUD 操作
- `/api/approvals/*` - 教师审批操作

### 组件分类
- `auth/` - 认证页面专用组件
- `student/` - 学生端专用组件
- `teacher/` - 教师端专用组件
- `common/` - 跨页面可复用组件
- `ui/` - 基础 UI 组件

### 数据层
- `lib/` - 工具函数和 API 客户端
- `types/` - TypeScript 类型定义
- `data/` - 模拟数据（开发阶段使用）
