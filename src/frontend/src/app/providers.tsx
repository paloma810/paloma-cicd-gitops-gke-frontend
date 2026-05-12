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

interface ProvidersProps {
  children: ReactNode
  backendUrl: string
}

export function Providers({ children, backendUrl }: ProvidersProps) {
  const setBackendUrl = useConfigStore((s) => s.setBackendUrl)

  useEffect(() => {
    setBackendUrl(backendUrl)
  }, [backendUrl, setBackendUrl])

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
