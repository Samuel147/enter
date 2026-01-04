@echo off
echo ========================================
echo   项目文件检查
echo ========================================
echo.

cd enrollment-system

echo [检查] 配置文件...
if exist package.json (echo [OK] package.json) else (echo [FAIL] package.json)
if exist tsconfig.json (echo [OK] tsconfig.json) else (echo [FAIL] tsconfig.json)
if exist tailwind.config.ts (echo [OK] tailwind.config.ts) else (echo [FAIL] tailwind.config.ts)
if exist postcss.config.js (echo [OK] postcss.config.js) else (echo [FAIL] postcss.config.js)
if exist next.config.js (echo [OK] next.config.js) else (echo [FAIL] next.config.js)
echo.

echo [检查] 源代码文件...
if exist src\app\layout.tsx (echo [OK] src\app\layout.tsx) else (echo [FAIL] src\app\layout.tsx)
if exist src\app\page.tsx (echo [OK] src\app\page.tsx) else (echo [FAIL] src\app\page.tsx)
if exist src\app\globals.css (echo [OK] src\app\globals.css) else (echo [FAIL] src\app\globals.css)
if exist src\app\(auth)\login\page.tsx (echo [OK] 登录页面) else (echo [FAIL] 登录页面)
echo.

echo [检查] 学生端页面...
if exist src\app\(student)\layout.tsx (echo [OK] 学生端布局) else (echo [FAIL] 学生端布局)
if exist src\app\(student)\dashboard\page.tsx (echo [OK] 仪表盘) else (echo [FAIL] 仪表盘)
if exist src\app\(student)\applications\page.tsx (echo [OK] 我的申请) else (echo [FAIL] 我的申请)
if exist src\app\(student)\new-application\page.tsx (echo [OK] 新建申请) else (echo [FAIL] 新建申请)
if exist src\app\(student)\profile\page.tsx (echo [OK] 个人信息) else (echo [FAIL] 个人信息)
echo.

echo [检查] 教师端页面...
if exist src\app\(teacher)\layout.tsx (echo [OK] 教师端布局) else (echo [FAIL] 教师端布局)
if exist src\app\(teacher)\approval\page.tsx (echo [OK] 审批中心) else (echo [FAIL] 审批中心)
if exist src\app\(teacher)\history\page.tsx (echo [OK] 审批历史) else (echo [FAIL] 审批历史)
if exist src\app\(teacher)\students\page.tsx (echo [OK] 学生管理) else (echo [FAIL] 学生管理)
if exist src\app\(teacher)\statistics\page.tsx (echo [OK] 数据统计) else (echo [FAIL] 数据统计)
echo.

echo [检查] API 路由...
if exist src\app\api\auth\login\route.ts (echo [OK] 登录 API) else (echo [FAIL] 登录 API)
if exist src\app\api\applications\route.ts (echo [OK] 申请 API) else (echo [FAIL] 申请 API)
if exist src\app\api\approvals\route.ts (echo [OK] 审批 API) else (echo [FAIL] 审批 API)
echo.

echo [检查] 组件...
if exist src\components\common\Button.tsx (echo [OK] Button 组件) else (echo [FAIL] Button 组件)
if exist src\components\common\Modal.tsx (echo [OK] Modal 组件) else (echo [FAIL] Modal 组件)
if exist src\components\student\StudentSidebar.tsx (echo [OK] StudentSidebar) else (echo [FAIL] StudentSidebar)
if exist src\components\student\StudentHeader.tsx (echo [OK] StudentHeader) else (echo [FAIL] StudentHeader)
if exist src\components\student\TimelineItem.tsx (echo [OK] TimelineItem) else (echo [FAIL] TimelineItem)
if exist src\components\teacher\TeacherSidebar.tsx (echo [OK] TeacherSidebar) else (echo [FAIL] TeacherSidebar)
if exist src\components\teacher\ApprovalCard.tsx (echo [OK] ApprovalCard) else (echo [FAIL] ApprovalCard)
echo.

echo [检查] 工具库...
if exist src\lib\auth.ts (echo [OK] auth.ts) else (echo [FAIL] auth.ts)
if exist src\lib\constants.ts (echo [OK] constants.ts) else (echo [FAIL] constants.ts)
if exist src\lib\utils.ts (echo [OK] utils.ts) else (echo [FAIL] utils.ts)
echo.

echo [检查] 类型定义...
if exist src\types\user.ts (echo [OK] user.ts) else (echo [FAIL] user.ts)
if exist src\types\application.ts (echo [OK] application.ts) else (echo [FAIL] application.ts)
if exist src\types\approval.ts (echo [OK] approval.ts) else (echo [FAIL] approval.ts)
echo.

echo [检查] 模拟数据...
if exist src\data\mock-users.ts (echo [OK] mock-users.ts) else (echo [FAIL] mock-users.ts)
if exist src\data\mock-applications.ts (echo [OK] mock-applications.ts) else (echo [FAIL] mock-applications.ts)
if exist src\data\mock-approvals.ts (echo [OK] mock-approvals.ts) else (echo [FAIL] mock-approvals.ts)
echo.

echo ========================================
echo   检查完成！
echo ========================================
echo.
echo 如果所有文件都显示 [OK]，说明项目结构完整。
echo.
echo 下一步：
echo 1. 运行 npm install 安装依赖
echo 2. 运行 npm run dev 启动开发服务器
echo 3. 访问 http://localhost:3000
echo.

pause
