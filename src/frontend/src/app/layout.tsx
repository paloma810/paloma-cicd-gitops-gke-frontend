import type { ReactNode } from 'react'
import { Providers } from './providers'

export const metadata = {
  title: 'Paloma App',
}

// force-dynamic: process.env.BACKEND_* は Kubernetes ConfigMap から実行時に注入される。
// 静的プリレンダリング（ビルド時）では ConfigMap の値が存在せずデフォルト値になるため、
// リクエスト時に Server Component を評価するよう強制する。
export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: ReactNode }) {
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
