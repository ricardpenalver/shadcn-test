import React from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, AlertTriangle, Lightbulb, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AIInsight } from '@/types'

interface AIInsightsProps {
  insights: AIInsight[]
  isLoading?: boolean
}

export const AIInsights: React.FC<AIInsightsProps> = ({
  insights,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Brain className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay insights disponibles</h3>
          <p className="text-muted-foreground text-center">
            Los insights de IA aparecerán aquí basados en tus datos y patrones de actividad.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction':
        return TrendingUp
      case 'recommendation':
        return Lightbulb
      case 'alert':
        return AlertTriangle
      default:
        return Brain
    }
  }

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'recommendation':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'alert':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-purple-600 bg-purple-50 border-purple-200'
    }
  }

  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-600" />
          Insights de IA
        </h2>
        <Badge variant="outline" className="text-xs">
          Powered by AI
        </Badge>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, index) => {
          const Icon = getInsightIcon(insight.type)
          const colorClass = getInsightColor(insight.type)
          const priorityClass = getPriorityColor(insight.priority)

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-l-4 ${colorClass}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${priorityClass}`}>
                            {insight.priority === 'high' ? 'Alta' : 
                             insight.priority === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {insight.type === 'prediction' ? 'Predicción' :
                             insight.type === 'recommendation' ? 'Recomendación' : 'Alerta'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {insight.confidence}% confianza
                      </div>
                      <Progress value={insight.confidence} className="w-16 h-2 mt-1" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <AlertDescription className="text-sm mb-4">
                    {insight.description}
                  </AlertDescription>

                  {insight.actionable && (
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Acción recomendada disponible</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalles
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Resumen de Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2">Resumen de IA</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Basado en el análisis de tus datos y patrones de actividad
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{insights.filter(i => i.type === 'prediction').length} Predicciones</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <span>{insights.filter(i => i.type === 'recommendation').length} Recomendaciones</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span>{insights.filter(i => i.type === 'alert').length} Alertas</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(insights.reduce((acc, insight) => acc + insight.confidence, 0) / insights.length)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Confianza promedio
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
