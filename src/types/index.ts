export interface SponsorshipAgreement {
  id: string
  title: string
  sponsor: {
    name: string
    contact: string
    email: string
    phone?: string
    website?: string
    company: string
  }
  description: string
  amount: number
  currency: string
  contentType: string[]
  requirements?: string
  startDate: Date
  deliveryDate?: Date
  paymentDate?: Date
  duration: 'once' | 'monthly' | 'quarterly' | 'yearly'
  priority: 'high' | 'medium' | 'low'
  status: 'prospectos' | 'en-negociacion' | 'contrato-enviado' | 'contrato-firmado' | 'en-produccion' | 'video-publicado' | 'pago-pendiente' | 'pago-recibido' | 'completado'
  tags: string[]
  notes?: string
  attachments: {
    contract?: File[]
    brandMaterials?: File[]
    references?: string[]
  }
  createdAt: Date
  updatedAt: Date
  assignedTo?: string
  aiInsights?: {
    conversionProbability: number
    recommendedPrice: number
    sentimentAnalysis: 'positive' | 'neutral' | 'negative'
    suggestedActions: string[]
  }
}

export interface KanbanColumn {
  id: string
  title: string
  status: SponsorshipAgreement['status']
  agreements: SponsorshipAgreement[]
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'manager' | 'creator'
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
    language: 'es' | 'en'
  }
}

export interface DashboardMetrics {
  totalAgreements: number
  activeAgreements: number
  monthlyRevenue: number
  conversionRate: number
  averageDealSize: number
  topPerformingContent: string[]
  revenueForecast: {
    month: string
    predicted: number
    actual?: number
  }[]
}

export interface AIInsight {
  id: string
  type: 'prediction' | 'recommendation' | 'alert'
  title: string
  description: string
  confidence: number
  actionable: boolean
  priority: 'high' | 'medium' | 'low'
  createdAt: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
  progress: number
  maxProgress: number
  category: 'deals' | 'revenue' | 'productivity' | 'engagement'
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  fields: Record<string, any>
  isPopular: boolean
  usageCount: number
}
