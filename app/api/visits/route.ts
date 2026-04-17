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

    const cookieHeader = req.headers.get('cookie') || ''

    // 👉 Cookie auslesen
    const visitorCookie = cookieHeader
      .split('; ')
      .find(c => c.startsWith('visitorId='))
      ?.split('=')[1]

    // 👉 neue ID wenn kein Cookie vorhanden
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

    const res = NextResponse.json({ count: data.count })

    // 👉 Cookie setzen (wichtig!)
    if (!visitorCookie) {
      res.headers.set(
        'Set-Cookie',
        `visitorId=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax`
      )
    }

    return res
  } catch (error) {
    console.error('Visit counter error:', error)
    return NextResponse.json({ count: 0 })
  }
}
