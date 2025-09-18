import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Calendar, BarChart3, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DashboardMetrics as DashboardMetricsType } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface DashboardMetricsProps {
  metrics: DashboardMetricsType | null
  isLoading?: boolean
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  metrics,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No hay métricas disponibles</h3>
        <p className="text-muted-foreground">Los datos aparecerán aquí una vez que tengas acuerdos.</p>
      </div>
    )
  }

  const metricsData = [
    {
      title: 'Total de Acuerdos',
      value: metrics.totalAgreements,
      icon: Users,
      trend: '+12%',
      trendDirection: 'up' as const,
      description: 'vs mes anterior',
      color: 'text-blue-600'
    },
    {
      title: 'Acuerdos Activos',
      value: metrics.activeAgreements,
      icon: Target,
      trend: '+8%',
      trendDirection: 'up' as const,
      description: 'en progreso',
      color: 'text-green-600'
    },
    {
      title: 'Ingresos del Mes',
      value: formatCurrency(metrics.monthlyRevenue),
      icon: DollarSign,
      trend: '+25%',
      trendDirection: 'up' as const,
      description: 'vs mes anterior',
      color: 'text-emerald-600'
    },
    {
      title: 'Tasa de Conversión',
      value: `${metrics.conversionRate}%`,
      icon: Zap,
      trend: '+5%',
      trendDirection: 'up' as const,
      description: 'promedio mensual',
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {metric.trendDirection === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={metric.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {metric.trend}
                  </span>
                  <span>{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Métricas Adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Promedio de Acuerdo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Promedio por Acuerdo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {formatCurrency(metrics.averageDealSize)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Valor promedio de cada acuerdo de patrocinio
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progreso mensual</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Contenido Top */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Contenido Más Efectivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topPerformingContent.map((content, index) => (
                <div key={content} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="text-sm font-medium">{content}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${90 - (index * 15)}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {90 - (index * 15)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proyección de Ingresos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Proyección de Ingresos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.revenueForecast.map((forecast, index) => (
              <motion.div
                key={forecast.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="font-medium">{forecast.month}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatCurrency(forecast.predicted)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Proyectado
                    </div>
                  </div>
                  {forecast.actual && (
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(forecast.actual)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Real
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
