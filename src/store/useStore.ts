import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SponsorshipAgreement, User, DashboardMetrics, AIInsight, Notification, Achievement } from '@/types'

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Agreements state
  agreements: SponsorshipAgreement[]
  setAgreements: (agreements: SponsorshipAgreement[]) => void
  addAgreement: (agreement: SponsorshipAgreement) => void
  updateAgreement: (id: string, updates: Partial<SponsorshipAgreement>) => void
  deleteAgreement: (id: string) => void
  moveAgreement: (id: string, newStatus: SponsorshipAgreement['status']) => void
  
  // UI state
  selectedAgreement: SponsorshipAgreement | null
  setSelectedAgreement: (agreement: SponsorshipAgreement | null) => void
  
  isCreateModalOpen: boolean
  setIsCreateModalOpen: (open: boolean) => void
  
  isEditModalOpen: boolean
  setIsEditModalOpen: (open: boolean) => void
  
  isDetailsModalOpen: boolean
  setIsDetailsModalOpen: (open: boolean) => void
  
  // Filters and search
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  statusFilter: string[]
  setStatusFilter: (statuses: string[]) => void
  
  priorityFilter: string[]
  setPriorityFilter: (priorities: string[]) => void
  
  dateRange: { from: Date | null; to: Date | null }
  setDateRange: (range: { from: Date | null; to: Date | null }) => void
  
  // Dashboard data
  metrics: DashboardMetrics | null
  setMetrics: (metrics: DashboardMetrics) => void
  
  aiInsights: AIInsight[]
  setAIInsights: (insights: AIInsight[]) => void
  
  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  
  // Achievements
  achievements: Achievement[]
  setAchievements: (achievements: Achievement[]) => void
  unlockAchievement: (id: string) => void
  
  // Theme
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Agreements state
      agreements: [],
      setAgreements: (agreements) => set({ agreements }),
      addAgreement: (agreement) => set((state) => ({
        agreements: [...state.agreements, agreement]
      })),
      updateAgreement: (id, updates) => set((state) => ({
        agreements: state.agreements.map(agreement =>
          agreement.id === id ? { ...agreement, ...updates, updatedAt: new Date() } : agreement
        )
      })),
      deleteAgreement: (id) => set((state) => ({
        agreements: state.agreements.filter(agreement => agreement.id !== id)
      })),
      moveAgreement: (id, newStatus) => set((state) => ({
        agreements: state.agreements.map(agreement =>
          agreement.id === id ? { ...agreement, status: newStatus, updatedAt: new Date() } : agreement
        )
      })),
      
      // UI state
      selectedAgreement: null,
      setSelectedAgreement: (agreement) => set({ selectedAgreement: agreement }),
      
      isCreateModalOpen: false,
      setIsCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
      
      isEditModalOpen: false,
      setIsEditModalOpen: (open) => set({ isEditModalOpen: open }),
      
      isDetailsModalOpen: false,
      setIsDetailsModalOpen: (open) => set({ isDetailsModalOpen: open }),
      
      // Filters and search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      statusFilter: [],
      setStatusFilter: (statuses) => set({ statusFilter: statuses }),
      
      priorityFilter: [],
      setPriorityFilter: (priorities) => set({ priorityFilter: priorities }),
      
      dateRange: { from: null, to: null },
      setDateRange: (range) => set({ dateRange: range }),
      
      // Dashboard data
      metrics: null,
      setMetrics: (metrics) => set({ metrics }),
      
      aiInsights: [],
      setAIInsights: (insights) => set({ aiInsights: insights }),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [{
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date()
        }, ...state.notifications]
      })),
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      })),
      clearAllNotifications: () => set({ notifications: [] }),
      
      // Achievements
      achievements: [],
      setAchievements: (achievements) => set({ achievements }),
      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map(achievement =>
          achievement.id === id ? { ...achievement, unlocked: true, unlockedAt: new Date() } : achievement
        )
      })),
      
      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'youtube-sponsorship-storage',
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        agreements: state.agreements,
        achievements: state.achievements,
      }),
    }
  )
)
