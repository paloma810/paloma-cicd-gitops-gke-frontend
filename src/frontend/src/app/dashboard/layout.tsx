import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const DashboardContent = dynamic(
  () => import('../../components/DashboardContent'),
  { ssr: false }
)

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardContent>{children}</DashboardContent>
}
