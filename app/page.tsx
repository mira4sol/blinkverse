import About from './components/About'
import HomeView from './components/HomeView'
import {Poppins} from 'next/font/google'

const poppins = Poppins({weight: ['400', '700'], subsets: ['latin']})

export default function Home() {
  return <main className={poppins.className + ' bg-[#141414]'}>
    <HomeView />
    <About/>
  </main>
}
