import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'visits.json')

function readData() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return { total: 0, daily: {}, visitors: {} }
  }
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data))
}

export async function GET(req: Request) {
  try {
    const data = readData()

    const today = new Date().toISOString().slice(0, 10)

    // Cookie lesen
    const cookieHeader = req.headers.get('cookie') || ''
    const visitorCookie = cookieHeader
      .split('; ')
      .find(c => c.startsWith('visitorId='))
      ?.split('=')[1]

    // neue ID wenn kein Cookie
    const visitorId =
      visitorCookie ||
      `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`

    // Besucher zählen (1x pro Tag)
    if (!data.visitors[visitorId] || data.visitors[visitorId] !== today) {
      data.total++
      data.daily[today] = (data.daily[today] || 0) + 1
      data.visitors[visitorId] = today
      writeData(data)
    }

    const res = NextResponse.json({
      total: data.total,
      today: data.daily[today] || 0
    })

    // Cookie setzen
    if (!visitorCookie) {
      res.headers.set(
        'Set-Cookie',
        `visitorId=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax`
      )
    }

    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json({ total: 0, today: 0 })
  }
}
