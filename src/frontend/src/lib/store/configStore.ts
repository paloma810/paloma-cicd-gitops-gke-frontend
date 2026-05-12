import { create } from 'zustand'

interface ConfigState {
  backendUrl: string | null
  initialized: boolean
  setBackendUrl: (url: string) => void
}

export const useConfigStore = create<ConfigState>((set) => ({
  backendUrl: null,
  initialized: false,
  setBackendUrl: (url: string) => set({ backendUrl: url, initialized: true }),
}))
