'use client'

import { Monda } from 'next/font/google'
import Image from 'next/image'

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import React, { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

import Editor from '@/public/illustrations/editor.svg'
import Launch from '@/public/illustrations/launch.svg'
import Preview from '@/public/illustrations/preview.svg'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const monda = Monda({ weight: ['400', '700'], subsets: ['latin'] })

const content: { icon: string; heading: string; body: React.JSX | string }[] = [
  {
    icon: Launch,
    heading: 'Launch the app',
    body: (
      <>
        Go ahead and click on the{' '}
        <span className='text-primary-color'>Launch App</span> button and it
        will direct you to the{' '}
        <span className='text-primary-color'>Blink Editor</span> dashboard
      </>
    ),
  },
  {
    icon: Editor,
    heading: 'Use blink editor',
    body: 'Input all the necessary information for your BlinkVerse card and select the category you want',
  },
  {
    icon: Preview,
    heading: 'Preview and create',
    body: "Preview your card and create the Blink if you're satisfied with how it looks. Now you can share that Blink!",
  },
]

const HowToUse = () => {
  const [isMobile, setIsMobile] = useState(false)
  const swiperRef = useRef<SwiperRef>(null)
  const clickNext = () => {
    swiperRef.current?.swiper?.slideNext()
  }

  const clickPrev = () => {
    swiperRef.current?.swiper.slidePrev()
  }
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1280)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  return (
    <section className='text-white md:px-36 sm:px-20 px-5 sm:py-10 py-5 w-full flex flex-col gap-10 items-center'>
      <div className='w-full flex flex-col justify-center'>
        <div className='flex flex-col sm:flex-row items-center gap-1 mb-5 justify-center'>
          <h2 className={monda.className + ' lg:text-2xl md:text-xl text-lg'}>
            HOW TO USE BLINKVERSE
          </h2>
          <span className='text-primary-color sm:block hidden'> | </span>
          <h3 className='sm:text-primary-color text-gray-300 lg:text-base md:text-sm text-xs'>
            Let's get you started with BlinkVerse
          </h3>
        </div>
        <p className='lg:text-lg sm:text-base text-sm text-center'>
          This is a simple onboarding for those who might be struggling with how
          to use Blinkverse
        </p>
        <p className='lg:text-lg sm:text-base text-sm text-center'>
          We've got you covered. It's super simple
        </p>
      </div>
      <div className='xl:w-full xl:min-w-[300px] w-[320px] xl:max-w-7xl overflow-hidden flex justify-center'>
        <div className='flex gap-4 items-center w-full xl:w-fit justify-center'>
          {isMobile && (
            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              className='w-full'
            >
              {content.map((item, index) => (
                <SwiperSlide key={item.heading}>
                  <HowToUseCard {...item} purple={index === 1} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {!isMobile &&
            content.map((item, index) => (
              <HowToUseCard {...item} purple={index === 1} key={item.heading} />
            ))}
        </div>
      </div>
      <div className='w-fit'>
        {isMobile && (
          <div className='w-full flex items-center justify-between mb-5'>
            <button
              className='p-4 rounded-md border-primary-color border'
              onClick={clickPrev}
            >
              <ArrowLeft className='w-3.5 h-3.5' />
            </button>
            <button
              className='p-4 rounded-md border-primary-color border'
              onClick={clickNext}
            >
              <ArrowRight className='w-3.5 h-3.5' />
            </button>
          </div>
        )}
        <Link href={'/hub'}>
          <button className='px-6 py-2 bg-gradient-to-tl bg-primary-color hover:bg-opacity-50 transition-all w-fit rounded-lg'>
            Launch App
          </button>
        </Link>
      </div>
    </section>
  )
}

export default HowToUse

const HowToUseCard = ({
  icon,
  heading,
  body,
  purple,
}: {
  icon: string
  heading: string
  body: React.JSX | string
  purple?: boolean
}) => {
  const style = purple
    ? 'bg-gradient-to-tl from-[#b073ff] to-[#5c2c9a]'
    : 'border border-primary-color'
  return (
    <div className={style + ' rounded-lg p-8 flex flex-col gap-4 w-80'}>
      <div className='p-3 rounded-lg border border-primary-color w-fit'>
        <Image src={icon} alt='' />
      </div>
      <h4 className='md:text-xl text-lg'>{heading}</h4>
      <p className='md:text-sm text-xs'>{body}</p>
    </div>
  )
}
