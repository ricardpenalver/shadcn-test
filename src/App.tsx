import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LayoutDashboard, Kanban, Settings, Bell, Menu, X } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { SponsorshipAgreement, DashboardMetrics, AIInsight, Achievement } from '@/types'

// Datos de ejemplo para demostración
const mockUser = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan@example.com',
  avatar: '',
  role: 'creator' as const,
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'es'
  }
}

const mockAgreements: SponsorshipAgreement[] = [
  {
    id: '1',
    title: 'Colaboración con TechCorp',
    sponsor: {
      name: 'TechCorp',
      contact: 'María García',
      email: 'maria@techcorp.com',
      phone: '+34 123 456 789',
      company: 'TechCorp Solutions'
    },
    description: 'Colaboración para promocionar el nuevo software de gestión empresarial',
    amount: 5000,
    currency: 'EUR',
    contentType: ['Video Principal', 'Stories'],
    requirements: 'Mencionar características principales del software',
    startDate: new Date('2024-01-15'),
    deliveryDate: new Date('2024-02-15'),
    paymentDate: new Date('2024-02-28'),
    duration: 'once',
    priority: 'high',
    status: 'en-negociacion',
    tags: ['tech', 'software', 'B2B'],
    notes: 'Cliente muy interesado, seguir de cerca',
    attachments: {
      contract: [],
      brandMaterials: [],
      references: []
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    assignedTo: 'Juan Pérez',
    aiInsights: {
      conversionProbability: 85,
      recommendedPrice: 5500,
      sentimentAnalysis: 'positive',
      suggestedActions: ['Enviar propuesta detallada', 'Programar llamada de seguimiento']
    }
  },
  {
    id: '2',
    title: 'Patrocinio Fashion Brand',
    sponsor: {
      name: 'Fashion Brand',
      contact: 'Carlos López',
      email: 'carlos@fashionbrand.com',
      phone: '+34 987 654 321',
      company: 'Fashion Brand SL'
    },
    description: 'Promoción de la nueva colección de primavera',
    amount: 3000,
    currency: 'EUR',
    contentType: ['Video Principal', 'Post en Redes'],
    requirements: 'Mostrar al menos 5 prendas de la colección',
    startDate: new Date('2024-02-01'),
    deliveryDate: new Date('2024-03-01'),
    paymentDate: new Date('2024-03-15'),
    duration: 'once',
    priority: 'medium',
    status: 'contrato-firmado',
    tags: ['fashion', 'lifestyle', 'primavera'],
    notes: 'Contrato firmado, comenzar producción',
    attachments: {
      contract: [],
      brandMaterials: [],
      references: []
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
    assignedTo: 'Juan Pérez'
  },
  {
    id: '3',
    title: 'Gaming App Launch',
    sponsor: {
      name: 'GameStudio',
      contact: 'Ana Martín',
      email: 'ana@gamestudio.com',
      company: 'GameStudio Inc'
    },
    description: 'Lanzamiento de nueva app de gaming móvil',
    amount: 7500,
    currency: 'EUR',
    contentType: ['Video Principal', 'Shorts', 'Post en Redes'],
    requirements: 'Gameplay de al menos 5 minutos, mostrar características únicas',
    startDate: new Date('2024-01-30'),
    deliveryDate: new Date('2024-03-15'),
    paymentDate: new Date('2024-04-01'),
    duration: 'once',
    priority: 'high',
    status: 'en-produccion',
    tags: ['gaming', 'mobile', 'app'],
    notes: 'En producción, entregar antes del 15 de marzo',
    attachments: {
      contract: [],
      brandMaterials: [],
      references: []
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-30'),
    assignedTo: 'Juan Pérez'
  }
]

const mockMetrics: DashboardMetrics = {
  totalAgreements: 12,
  activeAgreements: 8,
  monthlyRevenue: 25000,
  conversionRate: 75,
  averageDealSize: 4500,
  topPerformingContent: ['Video Principal', 'Stories', 'Post en Redes'],
  revenueForecast: [
    { month: 'Enero', predicted: 20000, actual: 22000 },
    { month: 'Febrero', predicted: 25000, actual: 25000 },
    { month: 'Marzo', predicted: 30000 },
    { month: 'Abril', predicted: 35000 }
  ]
}

const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'prediction',
    title: 'Alta probabilidad de cierre',
    description: 'El acuerdo con TechCorp tiene 85% de probabilidad de cerrarse en los próximos 7 días',
    confidence: 85,
    actionable: true,
    priority: 'high',
    createdAt: new Date()
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Precio recomendado',
    description: 'Considera aumentar el precio en 10% para acuerdos similares a Fashion Brand',
    confidence: 78,
    actionable: true,
    priority: 'medium',
    createdAt: new Date()
  }
]

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Primer Acuerdo',
    description: 'Completa tu primer acuerdo de patrocinio',
    icon: '🎯',
    unlocked: true,
    unlockedAt: new Date('2024-01-01'),
    progress: 1,
    maxProgress: 1,
    category: 'deals'
  },
  {
    id: '2',
    title: 'Máquina de Ventas',
    description: 'Cierra 10 acuerdos en un mes',
    icon: '🚀',
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    category: 'deals'
  }
]

function App() {
  const {
    user,
    setUser,
    setAgreements,
    setMetrics,
    setAIInsights,
    setAchievements,
    theme,
    setTheme,
    notifications
  } = useStore()

  const [currentView, setCurrentView] = useState<'dashboard' | 'kanban'>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Inicializar datos de ejemplo
    setUser(mockUser)
    setAgreements(mockAgreements)
    setMetrics(mockMetrics)
    setAIInsights(mockAIInsights)
    setAchievements(mockAchievements)

    // Aplicar tema
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [setUser, setAgreements, setMetrics, setAIInsights, setAchievements, theme])

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'kanban', label: 'Tablero Kanban', icon: Kanban },
  ]

  return (
    <div className={`min-h-screen bg-background ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: sidebarOpen ? 0 : -250 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r shadow-lg lg:static lg:translate-x-0"
        >
          <div className="flex flex-col h-full">
            {/* Logo y Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">YT</span>
                </div>
                <span className="font-bold text-lg">Sponsorship Manager</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      setCurrentView(item.id as 'dashboard' | 'kanban')
                      setSidebarOpen(false)
                    }}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name || 'Usuario'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || 'email@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenido Principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Superior */}
          <header className="bg-white dark:bg-gray-800 border-b px-4 py-3 lg:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold">
                  {currentView === 'dashboard' ? 'Dashboard' : 'Tablero Kanban'}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {notifications.filter(n => !n.read).length}
                    </Badge>
                  )}
                </Button>
                
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </Button>
              </div>
            </div>
          </header>

          {/* Contenido */}
          <main className="flex-1 overflow-auto">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentView === 'dashboard' ? <Dashboard /> : <KanbanBoard />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
