@echo off
echo ========================================
echo   智慧新生入学系统 - 快速启动
echo ========================================
echo.

cd enrollment-system

if not exist node_modules (
    echo [1/2] 正在安装依赖...
    powershell -Command "npm install --registry=https://registry.npmmirror.com"
    if errorlevel 1 (
        echo.
        echo 依赖安装失败！请检查网络连接或手动运行 npm install
        pause
        exit /b 1
    )
    echo 依赖安装完成！
    echo.
) else (
    echo [1/2] 依赖已安装，跳过安装步骤...
    echo.
)

echo [2/2] 启动开发服务器...
echo.
echo ========================================
echo   访问地址: http://localhost:3000
echo   学生账号: 20241234567 / 123456
echo   教师账号: T2024001 / 123456
echo ========================================
echo.

powershell -Command "npm run dev"

pause
