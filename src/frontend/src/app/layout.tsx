import type { ReactNode } from 'react'
import { Providers } from './providers'

export const metadata = {
  title: 'Paloma App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Server Component: process.env を直接読んで backendUrl を構築する。
  // fetch('/api/config') を廃止し、本番 Ingress の /api/* ルーティング競合を回避する。
  const protocol  = process.env.BACKEND_PROTOCOL ?? 'http'
  const server    = process.env.BACKEND_SERVER   ?? 'localhost'
  const port      = process.env.BACKEND_PORT     ?? '3000'
  const backendUrl = `${protocol}://${server}:${port}`

  return (
    <html lang="ja">
      <body>
        <Providers backendUrl={backendUrl}>{children}</Providers>
      </body>
    </html>
  )
}
