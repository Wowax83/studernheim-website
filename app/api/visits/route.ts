import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'visits.json')

function readCount() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data).count || 0
  } catch {
    return 0
  }
}

function writeCount(count: number) {
  fs.writeFileSync(filePath, JSON.stringify({ count }))
}

export async function GET() {
  let count = readCount()
  count++
  writeCount(count)

  return NextResponse.json({ count })
}
