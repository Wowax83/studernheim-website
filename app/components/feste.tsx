import { getFeste } from '@/lib/queries'
import FesteClient from './feste-client'

export default async function Feste() {
  const feste = await getFeste()
  return <FesteClient feste={feste} />
}
