'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, type ReactNode } from 'react'
import { useConfigStore } from '../lib/store/configStore'

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  const configInit = useConfigStore((s) => s.init)

  useEffect(() => {
    configInit()
  }, [configInit])

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
