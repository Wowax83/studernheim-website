import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'visits.json')

function readData() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return { count: 0, visitors: {} }
  }
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data))
}

export async function GET(req: Request) {
  try {
    const data = readData()

    const headers = req.headers

    // 👉 Cookie lesen
    const cookieHeader = headers.get('cookie') || ''
    const visitorCookie = cookieHeader
      .split('; ')
      .find(c => c.startsWith('visitorId='))
      ?.split('=')[1]

    // 👉 neue ID wenn kein Cookie
    const visitorId =
      visitorCookie ||
      `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`

    const today = new Date().toISOString().slice(0, 10)

    // 👉 nur 1x pro Tag zählen
    if (!data.visitors[visitorId] || data.visitors[visitorId] !== today) {
      data.count++
      data.visitors[visitorId] = today
      writeData(data)
    }

    const response = NextResponse.json({ count: data.count })

    // 👉 Cookie setzen (1 Jahr gültig)
    if (!visitorCookie) {
      response.headers.set(
        'Set-Cookie',
        `visitorId=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax`
      )
    }

    return response
  } catch (error) {
    console.error('Visit counter error:', error)

    return NextResponse.json({ count: 0 })
  }
}
