import { getVereine } from '@/lib/queries'
import VereineClient from './vereine-client'

export default async function Vereine() {
  const vereine = await getVereine()
  return <VereineClient vereine={vereine} />
}
