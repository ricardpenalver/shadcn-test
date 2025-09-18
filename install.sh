#!/bin/bash

# YouTube Sponsorship Manager - Script de Instalación
echo "🚀 Instalando YouTube Sponsorship Manager..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org/"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Se requiere Node.js 18 o superior. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente"

# Crear archivo de configuración
echo "⚙️ Configurando variables de entorno..."
if [ ! -f ".env.local" ]; then
    cp env.example .env.local
    echo "✅ Archivo .env.local creado"
    echo "📝 Por favor edita .env.local con tus claves de API"
else
    echo "✅ Archivo .env.local ya existe"
fi

# Crear directorios necesarios
echo "📁 Creando directorios..."
mkdir -p src/components/ui
mkdir -p src/components/kanban
mkdir -p src/components/dashboard
mkdir -p src/components/modals
mkdir -p src/components/analytics
mkdir -p src/hooks
mkdir -p src/services
mkdir -p public

echo "✅ Directorios creados"

# Verificar instalación
echo "🔍 Verificando instalación..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Instalación completada exitosamente!"
    echo ""
    echo "🎉 ¡YouTube Sponsorship Manager está listo!"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Edita .env.local con tus claves de API"
    echo "2. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo"
    echo "3. Abre http://localhost:5173 en tu navegador"
    echo ""
    echo "📚 Documentación: README.md"
    echo "🆘 Soporte: https://github.com/tu-usuario/youtube-sponsorship-manager"
else
    echo "❌ Error en la verificación. Revisa los logs anteriores."
    exit 1
fi
