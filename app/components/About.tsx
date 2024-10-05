import blinks from '@/public/images/about-blink.png'
import donations from '@/public/images/about-donations.png'
import funding from '@/public/images/about-funding.png'
import sales from '@/public/images/about-sales.png'
import social from '@/public/images/about-social.png'
import token from '@/public/images/about-token.png'
import Image from 'next/image'

import { Monda } from 'next/font/google'
const monda = Monda({ weight: ['400', '700'], subsets: ['latin'] })

const AboutContent: {
  heading: string
  body: React.JSX
  image: string
  objectPosition?: string
  imageSize: string
  objectFit?: 'contain' | 'cover'
  gridSpan?: string
  position?: 'row' | 'col'
}[] = [
  {
    heading: 'Create Blinks',
    body: (
      <>
        Easily create and share Blinks for <br /> various use cases
      </>
    ),
    image: blinks.src,
    objectPosition: '60%',
    imageSize: 'h-72',
    gridSpan: 'row-span-2 col-span-2',
    position: 'col',
    objectFit: 'contain',
  },
  {
    heading: 'Crowd Funding',
    body: (
      <>
        Launch instant crowdfunding <br /> campaigns
      </>
    ),
    image: funding.src,
    objectPosition: 'right',
    imageSize: 'h-36 aspect-[1/1]',
    objectFit: 'contain',
    position: 'col',
    gridSpan: 'col-span-2',
  },
  {
    heading: 'Donations',
    body: (
      <>
        Facilitate effortless donations <br /> on-chain
      </>
    ),
    image: donations.src,
    imageSize: 'aspect-[0.4/2] h-32 flip-image',
    position: 'col',
    gridSpan: 'col-span-2',
    objectFit: 'contain',
    objectPosition: 'left',
  },
  {
    heading: 'Token Swaps',
    body: (
      <>
        Easily create and share Blinks for <br /> various use cases
      </>
    ),
    image: token.src,
    imageSize: 'lg:h-full aspect-[2/1] w-32 md:w-auto h-2/4',
    gridSpan: 'col-span-4',
    objectFit: 'cover',
    position: 'row',
  },
  {
    heading: 'Nft Sales',
    body: (
      <>
        Streamline NFT sales and <br /> marketplace interactions
      </>
    ),
    image: sales.src,
    imageSize: 'w-full max-h-32 aspect-[2/1]',
    position: 'col',
    gridSpan: 'col-span-3',
    objectFit: 'cover',
    objectPosition: '50% 70%',
  },
  {
    heading: 'Social Integration',
    body: (
      <>
        Enhance social media with an <br />
        on-chain actions
      </>
    ),
    image: social.src,
    imageSize: 'lg:h-full aspect-[1/1] h-2/4',
    position: 'row',
    objectFit: 'cover',
    gridSpan: 'col-span-3',
  },
]

const About = () => {
  return (
    <section
      id='about'
      className='text-white md:px-36 sm:px-20 px-5 sm:py-10 py-5 w-full flex items-center flex-col gap-6'
    >
      <div className='flex flex-col sm:flex-row items-center gap-1 justify-center'>
        <h2 className={monda.className + ' lg:text-2xl md:text-xl text-lg'}>
          ABOUT BLINKVERSE
        </h2>
        <span className='text-[#3B2656] sm:block hidden'> | </span>
        <h3 className='text-[#B7B7B7] lg:text-base md:text-sm text-xs'>
          What we are all about
        </h3>
      </div>
      <p className='w-1/2 min-w-[300px] max-w-[500px] text-center text-sm opacity-80'>
        BlinkVerse is built on Solana's Blink protocol by Dialect transforming
        complex blockchain operations into user-friendly "Blinks". We're making
        web3 accessbible to everyone in the Solana ecosystem.
      </p>
      <div className='md:grid flex flex-col gap-3 md:grid-cols-6 md:grid-rows-3 md:w-5/6 min-w-[300px] md:max-w-[1300px] max-w-[600px]'>
        {AboutContent.map((item) => (
          <AboutCard {...item} key={item.heading} />
        ))}
      </div>
    </section>
  )
}

export default About

const AboutCard = ({
  gridSpan,
  heading,
  body,
  image,
  imageSize,
  objectPosition,
  objectFit,
  position = 'row',
}: {
  heading: string
  body: string
  image: string
  objectPosition?: string
  imageSize: string
  objectFit?: 'contain' | 'cover'
  gridSpan?: string
  position: 'col' | 'row'
}) => {
  return position === 'col' ? (
    <div
      className={
        'flex flex-col justify-between border border-primary-color bg-black rounded-md py-5 ' +
        gridSpan
      }
    >
      <h4 className='pl-3'>{heading}</h4>
      <div className={'relative ' + imageSize}>
        <Image
          fill
          alt=''
          src={image}
          objectPosition={objectPosition}
          objectFit={objectFit}
        />
      </div>
      <p className='px-3 opacity-80 text-sm'>{body}</p>
    </div>
  ) : (
    <div
      className={
        'flex md:flex-row flex-col items-center justify-between border border-primary-color bg-black rounded-md py-5 ' +
        gridSpan
      }
    >
      <span className='h-full flex flex-col justify-between'>
        <h4 className='pl-3'>{heading}</h4>

        <p className='px-3 opacity-80 text-sm'>{body}</p>
      </span>
      <div className={'relative ' + imageSize}>
        <Image
          fill
          alt=''
          src={image}
          objectPosition={objectPosition}
          objectFit={objectFit}
        />
      </div>
    </div>
  )
}
