#!/bin/bash

# Script para subir el proyecto a GitHub
echo "🚀 Subiendo YouTube Sponsorship Manager a GitHub..."

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json. Asegúrate de estar en el directorio correcto."
    exit 1
fi

# Inicializar Git si no existe
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositorio Git..."
    git init
fi

# Agregar todos los archivos
echo "📝 Agregando archivos al repositorio..."
git add .

# Hacer commit
echo "💾 Haciendo commit..."
git commit -m "🎉 YouTube Sponsorship Manager - Aplicación completa

✨ Características implementadas:
- Tablero Kanban con drag & drop
- Dashboard con métricas y AI insights
- 20+ componentes Shadcn UI
- Animaciones fluidas con Framer Motion
- Diseño responsive
- Tema claro/oscuro
- Documentación completa

🚀 Listo para usar!"

# Configurar repositorio remoto
echo "🔗 Configurando repositorio remoto..."
git remote add origin https://github.com/ricardpenalver/shadcn-test.git 2>/dev/null || echo "⚠️  Repositorio remoto ya configurado"

# Subir a GitHub
echo "⬆️  Subiendo a GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ ¡Proyecto subido exitosamente a GitHub!"
    echo "🔗 Repositorio: https://github.com/ricardpenalver/shadcn-test"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Ve a https://github.com/ricardpenalver/shadcn-test"
    echo "2. Verifica que todos los archivos estén presentes"
    echo "3. Configura GitHub Pages si quieres una demo en vivo"
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
