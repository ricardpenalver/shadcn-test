import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
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

export function getStatusColor(status: string): string {
  switch (status) {
    case 'prospectos':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'en-negociacion':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'contrato-enviado':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'contrato-firmado':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    case 'en-produccion':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200'
    case 'video-publicado':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'pago-pendiente':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'pago-recibido':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'completado':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
