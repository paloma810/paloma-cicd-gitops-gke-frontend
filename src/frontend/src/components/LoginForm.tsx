'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Toolbar from '@mui/material/Toolbar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useAuthStore } from '../lib/store/authStore'
import BearIllustration from './BearIllustration'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [msg, setMsg] = useState('userIDとpasswordを入力して下さい')
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore((s) => s.login)

  const handleLogin = async () => {
    try {
      const message = await login({ username, password })
      setMsg(message)
      if (useAuthStore.getState().isAuthenticated) {
        setMsg('move the top page ...')
        const redirect = searchParams.get('redirect') ?? '/dashboard'
        router.push(redirect)
      } else {
        setMsg('no authenticated')
      }
    } catch (error) {
      setMsg(String(error))
    }
  }

  return (
    <Card sx={{ width: 500, mx: 'auto', mt: 5 }}>
      <Toolbar sx={{ bgcolor: 'primary.main', color: 'white', minHeight: 48 }}>
        <Typography variant="subtitle1">Paloma-inds.com</Typography>
      </Toolbar>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="user ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Button fullWidth variant="contained" onClick={handleLogin} sx={{ mb: 2 }}>
          LogIn
        </Button>
        <Typography sx={{ mt: 1, textAlign: 'center' }}>{msg}</Typography>
        <div data-testid="bear-illustration" style={{ marginTop: 24, textAlign: 'center' }}>
          <BearIllustration />
        </div>
      </CardContent>
    </Card>
  )
}
