#!/bin/bash

# YouTube Sponsorship Manager - Script para Subir a GitHub
echo "🚀 Subiendo YouTube Sponsorship Manager a GitHub..."

# Verificar si estamos en un repositorio Git
if [ ! -d ".git" ]; then
    echo "❌ No se encontró un repositorio Git. Ejecutando git init..."
    git init
fi

# Verificar si hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Hay cambios sin commitear. Agregando archivos..."
    git add .
    git commit -m "🔄 Update: Mejoras y actualizaciones del proyecto"
fi

# Verificar si ya existe un remote origin
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ Repositorio remoto ya configurado"
    echo "📍 URL actual: $(git remote get-url origin)"
else
    echo "⚠️  No se encontró un repositorio remoto configurado"
    echo ""
    echo "📋 Para configurar el repositorio remoto, ejecuta:"
    echo "   git remote add origin https://github.com/TU_USUARIO/youtube-sponsorship-manager.git"
    echo ""
    echo "   (Reemplaza TU_USUARIO con tu usuario de GitHub)"
    echo ""
    echo "🔗 Luego ejecuta:"
    echo "   git push -u origin main"
    echo ""
    exit 1
fi

# Intentar hacer push
echo "⬆️  Subiendo cambios a GitHub..."
if git push origin main; then
    echo "✅ ¡Proyecto subido exitosamente a GitHub!"
    echo ""
    echo "🔗 Tu repositorio está disponible en:"
    echo "   $(git remote get-url origin)"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Ve a tu repositorio en GitHub"
    echo "2. Configura GitHub Pages si quieres una demo en vivo"
    echo "3. Agrega topics y descripción al repositorio"
    echo "4. Invita colaboradores si es necesario"
    echo ""
    echo "🎉 ¡Tu aplicación de gestión de patrocinios está en GitHub!"
else
    echo "❌ Error al subir el proyecto"
    echo ""
    echo "🔧 Posibles soluciones:"
    echo "1. Verifica que el repositorio existe en GitHub"
    echo "2. Verifica que tienes permisos de escritura"
    echo "3. Verifica tu autenticación con GitHub"
    echo ""
    echo "📖 Consulta GITHUB_SETUP.md para más detalles"
fi
