import React from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, Settings, Download, Calendar, BarChart3, Zap, Target } from 'lucide-react'
import { DashboardMetrics } from './DashboardMetrics'
import { AIInsights } from './AIInsights'
import { useStore } from '@/store/useStore'

export const Dashboard: React.FC = () => {
  const {
    metrics,
    aiInsights,
    notifications,
    achievements,
    addNotification
  } = useStore()

  const handleRefreshData = () => {
    // Simular actualización de datos
    addNotification({
      title: 'Datos Actualizados',
      message: 'Los datos del dashboard han sido actualizados correctamente',
      type: 'success'
    })
  }

  const handleExportData = () => {
    // Simular exportación de datos
    addNotification({
      title: 'Exportación Iniciada',
      message: 'Los datos se están preparando para descarga',
      type: 'info'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header del Dashboard */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Resumen de tu gestión de patrocinios de YouTube
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleRefreshData}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
                {notifications.filter(n => !n.read).length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              IA Insights
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Logros
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendario
            </TabsTrigger>
          </TabsList>

          {/* Pestaña de Resumen */}
          <TabsContent value="overview" className="space-y-6">
            <DashboardMetrics metrics={metrics} />
            
            {/* Widgets Adicionales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Actividad Reciente */}
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Nuevo acuerdo creado', time: 'Hace 2 horas', type: 'success' },
                      { action: 'Acuerdo movido a "En Negociación"', time: 'Hace 4 horas', type: 'info' },
                      { action: 'Pago recibido de TechCorp', time: 'Hace 1 día', type: 'success' },
                      { action: 'Recordatorio: Seguimiento Fashion Brand', time: 'Hace 2 días', type: 'warning' }
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Próximas Fechas Importantes */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Fechas Importantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Entrega Video TechCorp', date: '15 Feb 2024', priority: 'high' },
                      { title: 'Reunión Fashion Brand', date: '18 Feb 2024', priority: 'medium' },
                      { title: 'Pago GameStudio', date: '20 Feb 2024', priority: 'high' },
                      { title: 'Seguimiento Prospecto X', date: '22 Feb 2024', priority: 'low' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        <Badge className={
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {item.priority === 'high' ? 'Alta' :
                           item.priority === 'medium' ? 'Media' : 'Baja'}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pestaña de IA Insights */}
          <TabsContent value="insights">
            <AIInsights insights={aiInsights} />
          </TabsContent>

          {/* Pestaña de Logros */}
          <TabsContent value="achievements">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Sistema de Logros</h2>
                <p className="text-muted-foreground">
                  Desbloquea logros y mantén tu motivación alta
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`${achievement.unlocked ? 'ring-2 ring-green-500' : ''}`}>
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-4">{achievement.icon}</div>
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {achievement.description}
                        </p>
                        {achievement.unlocked ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Desbloqueado
                          </Badge>
                        ) : (
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              Progreso: {achievement.progress}/{achievement.maxProgress}
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Pestaña de Calendario */}
          <TabsContent value="calendar">
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Vista de Calendario</h3>
                  <p className="text-muted-foreground">
                    Próximamente disponible - Integración con Google Calendar
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
