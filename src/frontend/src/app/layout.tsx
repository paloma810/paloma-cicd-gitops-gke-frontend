import type { ReactNode } from 'react'
import { Providers } from './providers'

export const metadata = {
  title: 'Paloma App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
