# YouTube Sponsorship Manager

Una aplicación moderna de gestión de patrocinios de YouTube construida con React, TypeScript, y Shadcn UI. Incluye características innovadoras de IA, drag & drop, y analytics avanzados.

## 🚀 Características Principales

### ✨ Funcionalidades Core
- **Tablero Kanban Inteligente** con drag & drop fluido
- **9 Etapas de Patrocinio** desde prospectos hasta completado
- **Gestión Completa de Acuerdos** con información detallada
- **Búsqueda y Filtros Avanzados** en tiempo real

### 🤖 Características de IA
- **Predicciones de Conversión** basadas en datos históricos
- **Recomendaciones de Precios** inteligentes
- **Análisis de Sentimiento** de comunicaciones
- **Sugerencias de Acción** personalizadas

### 📊 Analytics y Métricas
- **Dashboard de Ingresos** con proyecciones
- **Métricas de Rendimiento** en tiempo real
- **Heatmap de Actividad** para optimización
- **Reportes Exportables** en múltiples formatos

### 🎮 Gamificación
- **Sistema de Logros** para motivación
- **Contador de Racha** de días consecutivos
- **Leaderboard** de creatores
- **Progreso Visual** de objetivos

### 🔗 Integraciones
- **YouTube API** para métricas de canal
- **Stripe** para pagos automatizados
- **HubSpot CRM** para sincronización
- **Google Calendar** para programación

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **Zustand** para estado global

### UI Components
- **Shadcn UI** para componentes base
- **Radix UI** para primitivos accesibles
- **Lucide React** para iconografía
- **@dnd-kit** para drag & drop

### Visualización
- **Recharts** para gráficos interactivos
- **D3.js** para visualizaciones avanzadas
- **Chart.js** para gráficos adicionales

### IA y Machine Learning
- **TensorFlow.js** para modelos locales
- **OpenAI API** para IA generativa
- **LangChain** para integración LLM

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd youtube-sponsorship-manager
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus claves:
```env
VITE_OPENAI_API_KEY=tu_clave_openai
VITE_STRIPE_PUBLISHABLE_KEY=tu_clave_stripe
VITE_YOUTUBE_API_KEY=tu_clave_youtube
VITE_HUBSPOT_API_KEY=tu_clave_hubspot
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── ui/                 # Componentes base de Shadcn UI
│   ├── kanban/            # Componentes del tablero Kanban
│   ├── dashboard/         # Componentes del dashboard
│   ├── modals/           # Modales de creación/edición
│   └── analytics/        # Componentes de analytics
├── lib/
│   ├── utils.ts          # Utilidades generales
│   └── validations.ts    # Validaciones con Zod
├── store/
│   └── useStore.ts       # Store global con Zustand
├── types/
│   └── index.ts          # Definiciones de tipos TypeScript
├── hooks/                # Custom hooks
├── services/             # Servicios de API
└── App.tsx              # Componente principal
```

## 🎯 Uso de la Aplicación

### 1. Dashboard Principal
- Visualiza métricas clave de rendimiento
- Accede a insights de IA
- Gestiona notificaciones y logros

### 2. Tablero Kanban
- **Arrastra y suelta** acuerdos entre columnas
- **Filtra por estado, prioridad, fecha**
- **Busca** acuerdos por nombre, empresa o descripción
- **Vista de calendario** para programación

### 3. Gestión de Acuerdos
- **Crear nuevos acuerdos** con formulario inteligente
- **Editar acuerdos existentes** con validación en tiempo real
- **Ver detalles completos** con historial de actividad
- **Adjuntar archivos** y referencias

### 4. Analytics Avanzados
- **Gráficos de ingresos** con proyecciones
- **Métricas de conversión** por etapa
- **Análisis de contenido** más efectivo
- **Reportes personalizables**

## 🔧 Configuración Avanzada

### Personalización de Temas
```typescript
// En useStore.ts
const theme = useStore(state => state.theme)
const setTheme = useStore(state => state.setTheme)

// Cambiar tema
setTheme('dark') // o 'light'
```

### Configuración de IA
```typescript
// Configurar insights de IA
const aiInsights = useStore(state => state.aiInsights)
const setAIInsights = useStore(state => state.setAIInsights)
```

### Integración con APIs
```typescript
// Servicios de API en src/services/
import { YouTubeService } from './services/youtube'
import { StripeService } from './services/stripe'
import { HubSpotService } from './services/hubspot'
```

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop** (1920px+)
- **Laptop** (1024px - 1919px)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```bash
docker build -t youtube-sponsorship-manager .
docker run -p 3000:3000 youtube-sponsorship-manager
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@youtubesponsorship.com
- 💬 Discord: [Servidor de la Comunidad](https://discord.gg/youtubesponsorship)
- 📖 Documentación: [docs.youtubesponsorship.com](https://docs.youtubesponsorship.com)

## 🙏 Agradecimientos

- [Shadcn UI](https://ui.shadcn.com/) por los componentes base
- [Radix UI](https://www.radix-ui.com/) por los primitivos accesibles
- [Framer Motion](https://www.framer.com/motion/) por las animaciones
- [Recharts](https://recharts.org/) por los gráficos
- [@dnd-kit](https://dndkit.com/) por el drag & drop

---

**¡Construido con ❤️ para la comunidad de creadores de YouTube!**
