import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from '../src/components/LoginForm'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({ get: () => null }),
}))

jest.mock('../src/lib/store/configStore', () => ({
  useConfigStore: (selector: (s: { init: () => Promise<void>; backendUrl: null; initialized: boolean }) => unknown) =>
    selector({ init: jest.fn(), backendUrl: null, initialized: false }),
}))

jest.mock('../src/lib/store/authStore', () => ({
  useAuthStore: (selector: (s: { login: jest.Mock }) => unknown) =>
    selector({ login: jest.fn() }),
}))

describe('LoginForm', () => {
  it('ログインフォームのレンダリング確認', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/user ID/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('くまのイラスト（data-testid="bear-illustration"）が表示されること', () => {
    render(<LoginForm />)
    expect(screen.getByTestId('bear-illustration')).toBeInTheDocument()
  })

  it('SVG 要素が存在すること', () => {
    render(<LoginForm />)
    const illustration = screen.getByTestId('bear-illustration')
    expect(illustration.querySelector('svg')).not.toBeNull()
  })
})
