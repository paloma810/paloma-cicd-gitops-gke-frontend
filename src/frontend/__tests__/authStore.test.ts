import { useAuthStore } from '../src/lib/store/authStore'

jest.mock('../src/lib/api/client', () => ({
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}))

import apiClient from '../src/lib/api/client'
const mockPost = apiClient.post as jest.Mock
const mockGet = apiClient.get as jest.Mock

beforeEach(() => {
  useAuthStore.setState({ token: null, user: null, isAuthenticated: false })
  jest.clearAllMocks()
})

describe('authStore', () => {
  it('login が /api/authenticate を呼び出すこと', async () => {
    mockPost.mockResolvedValueOnce({ data: { message: 'Login successful' } })
    mockGet.mockResolvedValueOnce({ data: { userId: '1', username: 'testuser' } })

    await useAuthStore.getState().login({ username: 'testuser', password: 'pass' })

    expect(mockPost).toHaveBeenCalledWith('/api/authenticate', {
      username: 'testuser',
      password: 'pass',
    })
  })

  it('ログイン成功後に isAuthenticated が true になること', async () => {
    mockPost.mockResolvedValueOnce({ data: { message: 'Login successful' } })
    mockGet.mockResolvedValueOnce({ data: { userId: '1', username: 'testuser' } })

    await useAuthStore.getState().login({ username: 'testuser', password: 'pass' })

    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().user?.username).toBe('testuser')
  })

  it('ログイン失敗時に isAuthenticated が false のままであること', async () => {
    mockPost.mockRejectedValueOnce(new Error('Unauthorized'))

    await expect(
      useAuthStore.getState().login({ username: 'bad', password: 'wrong' })
    ).rejects.toThrow()

    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('logout がステートをリセットすること', async () => {
    useAuthStore.setState({ isAuthenticated: true, user: { id: '1', username: 'u' }, token: 'tok' })
    mockPost.mockResolvedValueOnce({})

    await useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })
})
