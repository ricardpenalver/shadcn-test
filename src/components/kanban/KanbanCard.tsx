import React from 'react'
import { motion } from 'framer-motion'
import { MoreHorizontal, Calendar, DollarSign, Mail, Phone, Building, Eye, Move } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SponsorshipAgreement } from '@/types'
import { formatCurrency, formatDate, getPriorityColor, getStatusColor } from '@/lib/utils'

interface KanbanCardProps {
  agreement: SponsorshipAgreement
  onEdit: (agreement: SponsorshipAgreement) => void
  onDelete: (id: string) => void
  onView: (agreement: SponsorshipAgreement) => void
  onMove: (id: string) => void
  isDragging?: boolean
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  agreement,
  onEdit,
  onDelete,
  onView,
  onMove,
  isDragging = false
}) => {
  const priorityColor = getPriorityColor(agreement.priority)
  const statusColor = getStatusColor(agreement.status)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`kanban-card ${isDragging ? 'dragging' : ''} ${agreement.priority === 'high' ? 'pulse-urgent' : ''}`}
    >
      <Card className="relative overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{agreement.sponsor.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{agreement.title}</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <Badge className={`text-xs ${priorityColor}`}>
                {agreement.priority === 'high' ? 'Alta' : agreement.priority === 'medium' ? 'Media' : 'Baja'}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(agreement)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(agreement)}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onMove(agreement.id)}>
                    <Move className="h-4 w-4 mr-2" />
                    Mover
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(agreement.id)}
                    className="text-destructive"
                  >
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          {/* Descripción */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {agreement.description}
          </p>

          {/* Monto */}
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              {formatCurrency(agreement.amount, agreement.currency)}
            </span>
          </div>

          {/* Fecha de contacto */}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {formatDate(agreement.startDate)}
            </span>
          </div>

          {/* Información de contacto */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground truncate">
                {agreement.sponsor.email}
              </span>
            </div>
            {agreement.sponsor.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {agreement.sponsor.phone}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Building className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground truncate">
                {agreement.sponsor.company}
              </span>
            </div>
          </div>

          {/* Tags */}
          {agreement.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {agreement.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {agreement.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{agreement.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* AI Insights */}
          {agreement.aiInsights && (
            <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-md">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  IA Insights
                </span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                {agreement.aiInsights.conversionProbability}% probabilidad de cierre
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={agreement.assignedTo} />
                <AvatarFallback className="text-xs">
                  {agreement.sponsor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {formatDate(agreement.createdAt)}
              </span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => onView(agreement)}
              >
                Ver
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => onMove(agreement.id)}
              >
                Mover
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
