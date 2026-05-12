import { Suspense } from 'react'
import Box from '@mui/material/Box'
import LoginForm from '../../components/LoginForm'

export default function LoginPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </Box>
  )
}
