@echo off
setlocal

echo 🔄 Limpiando caché de electron-builder...
rmdir /S /Q "%LOCALAPPDATA%\electron-builder\Cache"

echo 🧹 Eliminando carpeta dist...
rmdir /S /Q "dist"

echo 🚧 Compilando proyecto con electron-builder...
npm run build

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Error durante la compilación. Revisa los logs.
    echo.
    goto :confirmExit
)

echo ✅ Compilación exitosa.

echo 🚀 Ejecutando Tech-Dashboard...
start "" "dist\win-unpacked\Tech-Dashboard.exe"

:confirmExit
echo.
set /p userChoice="¿Cerrar esta ventana? (S/N): "
if /I "%userChoice%"=="S" exit
goto :confirmExit

endlocal
