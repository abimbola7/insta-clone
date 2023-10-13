import Feeds from '@/components/feeds'
import Header from '@/components/header'
import Image from 'next/image'
import { getServerSession } from 'next-auth';


export default async function Home() {
  return (
    <>
      <Feeds />
    </>
  )
}
