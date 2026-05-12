'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuthStore } from '../lib/store/authStore'
import { useConfigStore } from '../lib/store/configStore'

const menuItems = [
  { title: 'Home', route: '/' },
  { title: 'About', route: '/about' },
]

export default function DashboardContent({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { checkAuthentication, isAuthenticated, logout } = useAuthStore()
  const isConfigInitialized = useConfigStore((s) => s.initialized)
  const router = useRouter()

  useEffect(() => {
    if (!isConfigInitialized) return
    checkAuthentication().finally(() => setLoading(false))
  }, [checkAuthentication, isConfigInitialized])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!isAuthenticated) {
    router.push('/login?redirect=/dashboard')
    return null
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch {
      router.push('/login')
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Vuetify App
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 240 }}>
          {menuItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(item.route)
                  setDrawerOpen(false)
                }}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>

      <Paper component="footer" square elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © 2023 My Vuetify App
        </Typography>
      </Paper>
    </Box>
  )
}
