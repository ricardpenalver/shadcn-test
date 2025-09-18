import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { KanbanCard } from './KanbanCard'
import { SponsorshipAgreement, KanbanColumn as KanbanColumnType } from '@/types'

interface KanbanColumnProps {
  column: KanbanColumnType
  onAddAgreement: (status: string) => void
  onEditAgreement: (agreement: SponsorshipAgreement) => void
  onDeleteAgreement: (id: string) => void
  onViewAgreement: (agreement: SponsorshipAgreement) => void
  onMoveAgreement: (id: string) => void
  onFilter: (columnId: string) => void
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onAddAgreement,
  onEditAgreement,
  onDeleteAgreement,
  onViewAgreement,
  onMoveAgreement,
  onFilter
}) => {
  const getColumnColor = (status: string) => {
    const colors = {
      'prospectos': 'border-blue-200 bg-blue-50/50',
      'en-negociacion': 'border-orange-200 bg-orange-50/50',
      'contrato-enviado': 'border-purple-200 bg-purple-50/50',
      'contrato-firmado': 'border-indigo-200 bg-indigo-50/50',
      'en-produccion': 'border-cyan-200 bg-cyan-50/50',
      'video-publicado': 'border-emerald-200 bg-emerald-50/50',
      'pago-pendiente': 'border-amber-200 bg-amber-50/50',
      'pago-recibido': 'border-green-200 bg-green-50/50',
      'completado': 'border-gray-200 bg-gray-50/50'
    }
    return colors[status as keyof typeof colors] || 'border-gray-200 bg-gray-50/50'
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      'prospectos': 'Prospectos',
      'en-negociacion': 'En Negociación',
      'contrato-enviado': 'Contrato Enviado',
      'contrato-firmado': 'Contrato Firmado',
      'en-produccion': 'En Producción',
      'video-publicado': 'Video Publicado',
      'pago-pendiente': 'Pago Pendiente',
      'pago-recibido': 'Pago Recibido',
      'completado': 'Completado'
    }
    return labels[status as keyof typeof labels] || status
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full"
    >
      <Card className={`kanban-column ${getColumnColor(column.status)} border-2`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm">{getStatusLabel(column.status)}</h3>
              <Badge variant="secondary" className="text-xs">
                {column.agreements.length}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onFilter(column.id)}
              >
                <Filter className="h-3 w-3" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onAddAgreement(column.status)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Acuerdo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onFilter(column.id)}>
                    Filtrar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-[500px] px-3 pb-3">
            <div className="space-y-3">
              {column.agreements.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    No hay acuerdos en esta etapa
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddAgreement(column.status)}
                    className="text-xs"
                  >
                    Agregar Primer Acuerdo
                  </Button>
                </motion.div>
              ) : (
                column.agreements.map((agreement) => (
                  <KanbanCard
                    key={agreement.id}
                    agreement={agreement}
                    onEdit={onEditAgreement}
                    onDelete={onDeleteAgreement}
                    onView={onViewAgreement}
                    onMove={onMoveAgreement}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}
