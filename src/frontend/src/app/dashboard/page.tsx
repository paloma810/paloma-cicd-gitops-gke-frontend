import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function DashboardPage() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            TOPページ
          </Typography>
          <Typography variant="body1">
            ここにTOPページのコンテンツが表示されます。
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
