import About from './components/About'
import HomeView from './components/HomeView'
import {Poppins} from 'next/font/google'
import HowToUse from './components/HowToUse'
import Footer from './components/Footer'

const poppins = Poppins({weight: ['400'], subsets: ['latin']})

export default function Home() {
  return <main className={poppins.className + ' bg-[#141414]'}>
    <HomeView />
    <About/>
    <HowToUse/>
    <Footer/>
  </main>
}
