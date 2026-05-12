import { create } from 'zustand'

interface ConfigState {
  backendUrl: string | null
  initialized: boolean
  init: () => Promise<void>
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  backendUrl: null,
  initialized: false,

  init: async () => {
    if (get().initialized) return
    const res = await fetch('/api/config')
    const data = await res.json()
    set({ backendUrl: data.backendUrl, initialized: true })
  },
}))
