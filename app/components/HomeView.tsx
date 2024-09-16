'use client'

/* eslint-disable react/no-unescaped-entities */
import { useToast } from '@/hooks/use-toast'
import { TwitterLogoIcon } from '@radix-ui/react-icons'
import {
  ArrowRight,
  Code,
  Coins,
  Globe,
  Image,
  Repeat,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FeatureBox } from './FeatureBox'
import { FeatureCard } from './FeatureCard'

const HomeView = () => {
  const { toast } = useToast()

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white font-sans'>
      <header className='container mx-auto px-4 py-6 flex justify-between items-center'>
        <h1 className={`text-2xl font-bold`}>
          <span
            className={`${
              visible ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
          >
            Blink
          </span>
          Verse
        </h1>
        {/* <nav>
          <ul className='flex space-x-4'>
            <li>
              <a href='#features' className='hover:text-purple-300'>
                Features
              </a>
            </li>
            <li>
              <a href='#about' className='hover:text-purple-300'>
                About
              </a>
            </li>
            <li>
              <a href='#contact' className='hover:text-purple-300'>
                Contact
              </a>
            </li>
          </ul>
        </nav> */}
      </header>

      <main className='container mx-auto px-4 py-12'>
        <section className='text-center mb-16'>
          <h2 className='text-5xl font-bold mb-4'>
            Power Your Social Future with BlinkVerse
          </h2>
          <p className='text-xl mb-8'>
            Seamless on-chain interactions for the Solana ecosystem
          </p>
          <Link href={'/hub'}>
            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center'>
              Get Started
              <ArrowRight className='ml-2' />
            </button>
          </Link>
        </section>

        <section id='features' className='grid md:grid-cols-3 gap-8 mb-16'>
          <FeatureCard
            icon={<Zap size={24} />}
            title='Create Blinks'
            description='Easily create and share Blinks for various use cases'
          />
          <FeatureCard
            icon={<Users size={24} />}
            title='Crowdfunding'
            description='Launch instant crowdfunding campaigns'
          />
          <FeatureCard
            icon={<Coins size={24} />}
            title='Donations'
            description='Facilitate effortless donations on-chain'
          />
          <FeatureCard
            icon={<Image size={24} />}
            title='NFT Sales'
            description='Streamline NFT sales and marketplace interactions'
          />
          <FeatureCard
            icon={<Repeat size={24} />}
            title='Token Swaps'
            description='Enable quick and easy token swaps'
          />
          <FeatureCard
            icon={<Users size={24} />}
            title='Social Integration'
            description='Enhance social media with on-chain actions'
          />
        </section>

        <section className='relative py-20 overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700'>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOTEzOS0xLjc5MDg2MS00LTQtNHMtNCAxLjc5MDg2MS00IDQgMS43OTA4NjEgNCA0IDQgNC0xLjc5MDg2MSA0LTR6bTAtOGMwLTIuMjA5MTM5LTEuNzkwODYxLTQtNC00cy00IDEuNzkwODYxLTQgNCAxLjc5MDg2MSA0IDQgNCA0LTEuNzkwODYxIDQtNHptLTggNGMwLTIuMjA5MTM5LTEuNzkwODYxLTQtNC00cy00IDEuNzkwODYxLTQgNCAxLjc5MDg2MSA0IDQgNCA0LTEuNzkwODYxIDQtNHptOCAwYzAtMi4yMDkxMzktMS43OTA4NjEtNC00LTRzLTQgMS43OTA4NjEtNCA0IDEuNzkwODYxIDQgNCA0IDQtMS43OTA4NjEgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          <div className='container mx-auto px-4 relative z-10'>
            <h2 className='text-5xl font-bold text-center text-white mb-8'>
              About BlinkVerse
            </h2>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <p className='text-xl text-blue-100 leading-relaxed'>
                  BlinkVerse is built on Solana's Blink protocol by Dialect,
                  transforming complex blockchain operations into user-friendly
                  "Blinks". We're making Web3 accessible to everyone in the
                  Solana ecosystem.
                </p>
                <div className='grid grid-cols-2 gap-4'>
                  <FeatureBox
                    icon={<Zap size={24} />}
                    text='Lightning-fast Blinks'
                  />
                  <FeatureBox icon={<Globe size={24} />} text='Global Reach' />
                  <FeatureBox
                    icon={<Code size={24} />}
                    text='Simplified Web3'
                  />
                  <FeatureBox
                    icon={<Users size={24} />}
                    text='Community Driven'
                  />
                </div>
              </div>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse'></div>
                <div className='relative bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 shadow-xl'>
                  <h3 className='text-2xl font-bold mb-4'>
                    Join the Community
                  </h3>
                  <p className='mb-6'>
                    Be part of the future of decentralized social interactions
                  </p>
                  {/* <button className='bg-white text-purple-700 hover:bg-purple-100 font-bold py-3 px-6 rounded-full transition duration-300'>
                    Get Started
                  </button> */}
                  <a
                    href='https://x.com/send_blink'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-full transition-colors duration-300'
                  >
                    <TwitterLogoIcon className='mr-2' />
                    Follow us on X (Twitter)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className='bg-black bg-opacity-30 py-8'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <h3 className='text-2xl font-bold mb-2'>BlinkVerse</h3>
            <p>Powered by Solana Blink</p>
          </div>
          <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4'>
            <a
              href='https://twitter.com/BlinkVerse'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300'
            >
              <TwitterLogoIcon className='mr-1' fontSize={16} />
              @BlinkVerse
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomeView
