import { ArrowRight } from "lucide-react" 
import heroBackground from '@/public/images/hero-background.png'
import heroImage from '@/public/images/hero-image.png'
import Image from "next/image"
import {Monda} from 'next/font/google'


const monda = Monda({weight: ['400', '700'], subsets: ['latin']})
const Content = () => {

    return (
        <section 
        className={monda.className + " px-5 w-full h-full text-white bg-[#110F1FA3] relative flex flex-col justify-between overflow-hidden gap-5"} >
            <div className="w-full h-full flex flex-col items-center gap-3">
            <h1 className="tracking-[.7em] mt-10 text-xl bg-gradient-to-r from-[#c498fe] to-[#4e3272] text-transparent bg-clip-text">BLINKVERSE</h1>
            <h2 className="text-3xl text-center">Revolutionising The Social Future <br/> With BlinkVerse</h2>
            <p>Create your own tokens with one click!</p>
            <p>34, 901 Tokens Created</p>
            <button className="flex items-center">
                <span className="px-4 py-2 bg-primary-color rounded-lg">Get Started</span>
                <div className="bg-primary-color w-5 h-2"/>
                <span className="px-4 py-2 bg-primary-color rounded-lg"><ArrowRight/></span>
            </button>
            </div>
            
            <div className="aspect-[1/6] w-full relative opacity-55"
            ><Image src={heroImage.src} alt="" fill style={{objectFit: 'cover', objectPosition: '75% 40%'}}/></div>
            <Image src={heroBackground.src} alt="" className="absolute opacity-5 overflow-hidden" fill />
        </section>
    )
}

export default Content
