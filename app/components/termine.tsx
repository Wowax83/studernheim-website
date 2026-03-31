import { getAllEvents } from '@/lib/queries'
import TermineClient from './termine-client'

export default async function Termine() {
  const events = await getAllEvents()
  return <TermineClient events={events} />
}
