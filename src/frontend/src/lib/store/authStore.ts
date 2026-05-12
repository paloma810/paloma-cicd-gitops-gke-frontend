import { create } from 'zustand'
import apiClient from '../api/client'

interface User {
  id: string
  username: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (credentials: { username: string; password: string }) => Promise<string>
  checkAuthentication: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: async (credentials) => {
    const { data } = await apiClient.post<{ message: string }>(
      '/api/authenticate',
      credentials
    )
    if (data.message === 'Login successful') {
      await useAuthStore.getState().checkAuthentication()
    }
    return data.message
  },

  checkAuthentication: async () => {
    try {
      const { data } = await apiClient.get<{ userId: string; username: string }>(
        '/api/me'
      )
      set({
        isAuthenticated: true,
        user: { id: data.userId, username: data.username },
      })
    } catch {
      set({ isAuthenticated: false, user: null, token: null })
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/api/logout')
    } finally {
      set({ token: null, user: null, isAuthenticated: false })
    }
  },
}))
