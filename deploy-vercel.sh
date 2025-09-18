#!/bin/bash

# Script para desplegar en Vercel
echo "🚀 Desplegando YouTube Sponsorship Manager en Vercel..."

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json. Asegúrate de estar en el directorio correcto."
    exit 1
fi

# Verificar si Vercel CLI está disponible
if ! command -v npx &> /dev/null; then
    echo "❌ npx no está disponible. Instala Node.js primero."
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install

echo "🔨 Construyendo la aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error al construir la aplicación"
    exit 1
fi

echo "🚀 Desplegando en Vercel..."
npx vercel --prod --yes

if [ $? -eq 0 ]; then
    echo "✅ ¡Aplicación desplegada exitosamente en Vercel!"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Ve a tu dashboard de Vercel"
    echo "2. Encuentra tu proyecto 'youtube-sponsorship-manager'"
    echo "3. Copia la URL de producción"
    echo "4. ¡Comparte tu aplicación con el mundo!"
    echo ""
    echo "🎉 ¡Tu aplicación de gestión de patrocinios está en vivo!"
else
    echo "❌ Error al desplegar en Vercel"
    echo ""
    echo "🔧 Posibles soluciones:"
    echo "1. Ejecuta 'npx vercel login' primero"
    echo "2. Verifica tu conexión a internet"
    echo "3. Intenta usar la interfaz web de Vercel"
fi
