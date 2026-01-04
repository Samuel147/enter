# 快速启动指南

## 📦 项目简介

这是一个完整的 **新生入学管理系统**，基于 Next.js 14 + TypeScript + Tailwind CSS 开发。

### 主要功能
- 👨‍🎓 **学生端**：入学流程追踪、申请管理、个人信息
- 👨‍🏫 **教师端**：审批管理、学生管理、数据统计
- 🔐 **认证系统**：角色登录、权限控制

## 🚀 三步启动

### 第 1 步：安装依赖

```bash
cd enrollment-system
npm install
```

> 💡 **提示**：如果安装失败，使用国内镜像：
> ```bash
> npm install --registry=https://registry.npmmirror.com
> ```

### 第 2 步：启动项目

```bash
npm run dev
```

或者使用启动脚本：
```bash
start.bat
```

### 第 3 步：访问应用

打开浏览器访问：http://localhost:3000

## 🔐 测试账号

### 学生端
```
学号：20241234567
密码：123456
```

### 教师端
```
工号：T2024001
密码：123456
```

## 📋 功能清单

### 学生端
- ✅ 我的入学（仪表盘）
  - 入学进度展示
  - 入学流程时间线
  - 快速操作入口
- ✅ 我的申请
  - 申请列表
  - 状态筛选
  - 申请详情
- ✅ 新建申请
  - 多种申请类型
  - 表单提交
  - 附件上传
- ✅ 个人信息
  - 学生档案
  - 基本信息展示

### 教师端
- ✅ 审批中心
  - 待审批列表
  - 审批统计
  - 快速审批
  - 审批详情
- ✅ 审批历史
  - 审批记录
  - 处理时间
  - 拒绝理由
- ✅ 学生管理
  - 学生列表
  - 搜索功能
  - 入学进度
- ✅ 数据统计
  - 本周统计
  - 类型分布
  - 效率分析

## 📂 项目结构

```
enrollment-system/
├── src/
│   ├── app/              # 页面路由
│   │   ├── (auth)/       # 认证页面
│   │   ├── (student)/    # 学生端
│   │   ├── (teacher)/    # 教师端
│   │   └── api/         # API 接口
│   ├── components/       # 组件
│   ├── lib/             # 工具函数
│   ├── types/           # 类型定义
│   └── data/            # 模拟数据
```

## 🎨 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态**: React Hooks
- **API**: Next.js API Routes

## 🔧 常见问题

### Q1: npm install 失败？
**A**: 使用国内镜像源：
```bash
npm install --registry=https://registry.npmmirror.com
```

### Q2: 端口 3000 被占用？
**A**: 修改端口启动：
```bash
npm run dev -p 3001
```

### Q3: 登录后页面空白？
**A**: 清除浏览器缓存，或使用无痕模式

### Q4: TypeScript 类型错误？
**A**: 确保所有依赖已正确安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 更多文档

- [完整文档](./README.md)
- [开发总结](./DEVELOPMENT_SUMMARY.md)
- [项目结构](./PROJECT_STRUCTURE.md)
- [完成报告](./PROJECT_COMPLETE.md)

## 🎯 核心功能演示

### 1. 学生登录流程
1. 打开 http://localhost:3000
2. 选择"新生"角色
3. 输入学号 `20241234567` 和密码 `123456`
4. 点击登录
5. 自动跳转到学生仪表盘

### 2. 教师审批流程
1. 点击"退出登录"
2. 选择"教师"角色
3. 输入工号 `T2024001` 和密码 `123456`
4. 点击登录
5. 进入审批中心
6. 点击"通过"或"拒绝"处理申请

### 3. 学生提交申请
1. 登录学生端
2. 点击"新建申请"
3. 填写申请信息
4. 点击"提交申请"
5. 在"我的申请"查看状态

## 💡 开发提示

### 添加新页面
1. 在 `src/app/(student)` 或 `src/app/(teacher)` 创建文件夹
2. 添加 `page.tsx` 文件
3. 在侧边栏添加导航链接

### 修改样式
- 直接修改组件中的 Tailwind 类名
- 或修改 `tailwind.config.ts` 配置

### 添加 API
1. 在 `src/app/api` 创建路由
2. 实现对应的 HTTP 方法
3. 在前端组件中调用

## 🚀 生产部署

### 构建项目
```bash
npm run build
```

### 启动生产服务
```bash
npm start
```

### 部署到 Vercel
```bash
npm install -g vercel
vercel
```

## 📞 获取帮助

如遇到问题：
1. 查看控制台错误信息
2. 检查文件是否完整（运行 `check-project.bat`）
3. 确认依赖已安装
4. 清除缓存重新安装

## 🎉 开始使用

现在就开始使用吧！祝使用愉快！

---

**项目版本**: v1.0.0
**更新日期**: 2026-01-04
**技术栈**: Next.js 14 + TypeScript + Tailwind CSS
