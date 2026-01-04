# 部署指南

## 🚀 部署方式

### 1. 本地开发部署

#### 环境要求
- Node.js 18.x 或更高版本
- npm 或 pnpm
- 现代浏览器（Chrome, Firefox, Safari, Edge）

#### 安装步骤
```bash
# 1. 进入项目目录
cd enrollment-system

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

#### 访问应用
打开浏览器访问：http://localhost:3000

---

### 2. 生产环境部署

#### 构建生产版本
```bash
# 进入项目目录
cd enrollment-system

# 安装依赖
npm install

# 构建项目
npm run build

# 启动生产服务
npm start
```

#### 访问应用
打开浏览器访问：http://localhost:3000

---

### 3. Vercel 部署（推荐）

#### 方式一：通过 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 生产环境部署
vercel --prod
```

#### 方式二：通过 Git 仓库

1. 将项目推送到 GitHub/GitLab/Bitbucket
2. 访问 https://vercel.com/new
3. 导入你的 Git 仓库
4. Vercel 会自动检测 Next.js 项目并配置
5. 点击"Deploy"按钮开始部署

---

### 4. Docker 部署

#### 创建 Dockerfile
在项目根目录创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 生产阶段
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

#### 更新 next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
```

#### 构建和运行
```bash
# 构建镜像
docker build -t enrollment-system .

# 运行容器
docker run -p 3000:3000 enrollment-system
```

---

### 5. 传统服务器部署

#### 使用 PM2 管理进程

```bash
# 1. 安装 PM2
npm install -g pm2

# 2. 构建项目
cd enrollment-system
npm install
npm run build

# 3. 使用 PM2 启动
pm2 start npm --name "enrollment-system" -- start

# 4. 查看状态
pm2 status

# 5. 设置开机自启
pm2 startup
pm2 save
```

---

## 📋 部署前检查清单

- [ ] 更新 `package.json` 中的版本号
- [ ] 检查所有环境变量配置
- [ ] 移除或更新测试数据
- [ ] 更新 API 端点配置
- [ ] 检查错误处理机制
- [ ] 测试所有核心功能
- [ ] 检查性能指标
- [ ] 配置日志记录
- [ ] 设置监控告警
- [ ] 备份数据库

## 🔧 环境变量配置

创建 `.env.local` 文件：

```env
# API 配置
NEXT_PUBLIC_API_URL=https://api.example.com

# 认证配置
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key

# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# 其他配置
NEXT_PUBLIC_APP_NAME=智慧新生入学系统
```

## 🔒 安全配置

### 1. HTTPS 配置
- 使用 Let's Encrypt 免费证书
- 配置 SSL 证书
- 强制 HTTPS 重定向

### 2. 安全头配置
在 `next.config.js` 中添加：

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### 3. CORS 配置
在 API 路由中配置 CORS：

```typescript
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

## 📊 性能优化

### 1. 图片优化
```typescript
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority
/>
```

### 2. 代码分割
```typescript
import dynamic from 'next/dynamic'

const Modal = dynamic(() => import('@/components/common/Modal'), {
  loading: () => <p>Loading...</p>,
})
```

### 3. 缓存配置
```typescript
export const revalidate = 3600 // 1 小时
export const dynamic = 'force-static'
```

## 📈 监控和日志

### 1. 错误监控
集成 Sentry：
```bash
npm install @sentry/nextjs
```

### 2. 性能监控
集成 Vercel Analytics：
```bash
npm install @vercel/analytics
```

### 3. 日志记录
使用 winston 或 pino：
```bash
npm install winston
```

## 🔄 持续集成/持续部署

### GitHub Actions 示例

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 故障排查

### 常见问题

#### 1. 构建失败
```bash
# 清除缓存
rm -rf .next node_modules
npm install
npm run build
```

#### 2. 运行时错误
- 检查 Node.js 版本
- 查看浏览器控制台错误
- 检查服务器日志

#### 3. 性能问题
- 使用 Lighthouse 分析
- 检查网络请求
- 优化图片和资源

## 📞 技术支持

- **官方文档**: https://nextjs.org/docs
- **Vercel 文档**: https://vercel.com/docs
- **Tailwind 文档**: https://tailwindcss.com/docs

---

**最后更新**: 2026-01-04
**版本**: v1.0.0
