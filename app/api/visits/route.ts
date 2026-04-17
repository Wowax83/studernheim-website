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
  const data = readData()

  // 👉 IP holen (funktioniert auch hinter Proxy)
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    'unknown'

  const today = new Date().toISOString().slice(0, 10)

  // 👉 hat der User heute schon gezählt?
  if (!data.visitors[ip] || data.visitors[ip] !== today) {
    data.count++
    data.visitors[ip] = today
    writeData(data)
  }

  return NextResponse.json({ count: data.count })
}
