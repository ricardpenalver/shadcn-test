import React, { useState, useMemo } from 'react'
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, Calendar, Download, Settings, LayoutGrid, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'
import { SponsorshipAgreement, KanbanColumn as KanbanColumnType } from '@/types'
import { useStore } from '@/store/useStore'

const KANBAN_COLUMNS: Omit<KanbanColumnType, 'agreements'>[] = [
  { id: 'prospectos', title: 'Prospectos', status: 'prospectos', color: 'blue' },
  { id: 'en-negociacion', title: 'En Negociación', status: 'en-negociacion', color: 'orange' },
  { id: 'contrato-enviado', title: 'Contrato Enviado', status: 'contrato-enviado', color: 'purple' },
  { id: 'contrato-firmado', title: 'Contrato Firmado', status: 'contrato-firmado', color: 'indigo' },
  { id: 'en-produccion', title: 'En Producción', status: 'en-produccion', color: 'cyan' },
  { id: 'video-publicado', title: 'Video Publicado', status: 'video-publicado', color: 'emerald' },
  { id: 'pago-pendiente', title: 'Pago Pendiente', status: 'pago-pendiente', color: 'amber' },
  { id: 'pago-recibido', title: 'Pago Recibido', status: 'pago-recibido', color: 'green' },
  { id: 'completado', title: 'Completado', status: 'completado', color: 'gray' }
]

export const KanbanBoard: React.FC = () => {
  const {
    agreements,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    moveAgreement,
    setIsCreateModalOpen,
    setSelectedAgreement,
    setIsEditModalOpen,
    setIsDetailsModalOpen
  } = useStore()

  const [activeId, setActiveId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'kanban' | 'calendar'>('kanban')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Filtrar acuerdos basado en búsqueda y filtros
  const filteredAgreements = useMemo(() => {
    return agreements.filter(agreement => {
      const matchesSearch = searchQuery === '' || 
        agreement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agreement.sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agreement.sponsor.company.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(agreement.status)
      const matchesPriority = priorityFilter.length === 0 || priorityFilter.includes(agreement.priority)

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [agreements, searchQuery, statusFilter, priorityFilter])

  // Organizar acuerdos por columnas
  const columns = useMemo(() => {
    return KANBAN_COLUMNS.map(column => ({
      ...column,
      agreements: filteredAgreements.filter(agreement => agreement.status === column.status)
    }))
  }, [filteredAgreements])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Lógica para manejar drag over si es necesario
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Encontrar la columna de destino
    const targetColumn = columns.find(col => col.id === overId)
    if (targetColumn) {
      moveAgreement(activeId, targetColumn.status as any)
    }
  }

  const handleAddAgreement = (status: string) => {
    setIsCreateModalOpen(true)
  }

  const handleEditAgreement = (agreement: SponsorshipAgreement) => {
    setSelectedAgreement(agreement)
    setIsEditModalOpen(true)
  }

  const handleDeleteAgreement = (id: string) => {
    // Implementar confirmación de eliminación
    console.log('Delete agreement:', id)
  }

  const handleViewAgreement = (agreement: SponsorshipAgreement) => {
    setSelectedAgreement(agreement)
    setIsDetailsModalOpen(true)
  }

  const handleMoveAgreement = (id: string) => {
    // Implementar modal de selección de columna
    console.log('Move agreement:', id)
  }

  const handleFilter = (columnId: string) => {
    // Implementar filtros específicos por columna
    console.log('Filter column:', columnId)
  }

  const activeAgreement = activeId ? agreements.find(a => a.id === activeId) : null

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header del Tablero */}
      <div className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Tablero de Patrocinios</h1>
            <Badge variant="outline" className="text-sm">
              {agreements.length} acuerdos
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'kanban' ? 'calendar' : 'kanban')}
            >
              {viewMode === 'kanban' ? <Calendar className="h-4 w-4 mr-2" /> : <LayoutGrid className="h-4 w-4 mr-2" />}
              {viewMode === 'kanban' ? 'Vista Calendario' : 'Vista Kanban'}
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
            
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Acuerdo
            </Button>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar acuerdos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                Filtro por Estado
              </DropdownMenuItem>
              <DropdownMenuItem>
                Filtro por Prioridad
              </DropdownMenuItem>
              <DropdownMenuItem>
                Filtro por Fecha
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Limpiar Filtros
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Contenido del Tablero */}
      <div className="flex-1 p-4">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'kanban' | 'calendar')}>
          <TabsContent value="kanban" className="h-full">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 h-full">
                {columns.map((column) => (
                  <KanbanColumn
                    key={column.id}
                    column={column}
                    onAddAgreement={handleAddAgreement}
                    onEditAgreement={handleEditAgreement}
                    onDeleteAgreement={handleDeleteAgreement}
                    onViewAgreement={handleViewAgreement}
                    onMoveAgreement={handleMoveAgreement}
                    onFilter={handleFilter}
                  />
                ))}
              </div>

              <DragOverlay>
                {activeAgreement ? (
                  <div className="opacity-50">
                    <KanbanCard
                      agreement={activeAgreement}
                      onEdit={handleEditAgreement}
                      onDelete={handleDeleteAgreement}
                      onView={handleViewAgreement}
                      onMove={handleMoveAgreement}
                      isDragging={true}
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </TabsContent>
          
          <TabsContent value="calendar" className="h-full">
            <div className="flex items-center justify-center h-full bg-muted rounded-lg">
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Vista de Calendario</h3>
                <p className="text-muted-foreground">Próximamente disponible</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
