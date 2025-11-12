import { create } from 'zustand'

interface UIState {
  designMode: 'design' | 'code'
  setDesignMode: (mode: 'design' | 'code') => void
  systemBootComplete: boolean
  setSystemBootComplete: (complete: boolean) => void
  hoveredCardId: string | null
  setHoveredCardId: (id: string | null) => void
  activeSection: string | null
  setActiveSection: (section: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  designMode: 'design',
  setDesignMode: (mode) => {
    set({ designMode: mode })
    if (typeof window !== 'undefined') {
      localStorage.setItem('designMode', mode)
    }
  },
  systemBootComplete: false,
  setSystemBootComplete: (complete) => set({ systemBootComplete: complete }),
  hoveredCardId: null,
  setHoveredCardId: (id) => set({ hoveredCardId: id }),
  activeSection: null,
  setActiveSection: (section) => set({ activeSection: section }),
}))

// Load persisted state on mount
if (typeof window !== 'undefined') {
  const savedDesignMode = localStorage.getItem('designMode') as 'design' | 'code' | null
  
  if (savedDesignMode) {
    useUIStore.getState().setDesignMode(savedDesignMode)
  }
}

