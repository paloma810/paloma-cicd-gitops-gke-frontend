import { NextResponse } from 'next/server'

export async function GET() {
  const protocol = process.env.BACKEND_PROTOCOL ?? 'http'
  const server   = process.env.BACKEND_SERVER   ?? 'localhost'
  const port     = process.env.BACKEND_PORT     ?? '3000'

  return NextResponse.json({ backendUrl: `${protocol}://${server}:${port}` })
}
