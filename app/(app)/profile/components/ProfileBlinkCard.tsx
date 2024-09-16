'use client'

import {
  Copy,
  Edit,
  ExternalLink,
  FileCode,
  FileText,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface Props {
  blink: any
}

const ProfileBlinkCard = ({ blink }: Props) => {
  const [copied, setCopied] = useState<string>('')

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className='bg-gradient-to-r from-purple-600/30 to-indigo-600/30 backdrop-blur-sm rounded-lg p-6 border border-indigo-400/30 relative overflow-hidden group'>
      <div className='absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <button className='p-1 bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300'>
          <Edit className='w-4 h-4 text-white' />
        </button>
        <button className='p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300'>
          <Trash2 className='w-4 h-4 text-white' />
        </button>
      </div>
      <h3 className='text-xl font-bold text-indigo-100 mb-2'>{blink.title}</h3>
      <p className='text-indigo-200 mb-4'>Category: {blink.category}</p>
      <div className='flex items-center mb-4'>
        <ExternalLink className='w-5 h-5 text-indigo-300 mr-2' />
        <span className='text-indigo-100'>
          {blink.interactions} interactions
        </span>
      </div>
      <div className='flex flex-wrap gap-2'>
        {['url', 'iframe', 'dscr'].map((type) => (
          <button
            key={type}
            onClick={() => copyToClipboard(blink[type], type)}
            className='flex items-center px-3 py-1 bg-indigo-600/50 hover:bg-indigo-700/50 rounded-full text-sm text-white transition-colors duration-300'
          >
            {type === 'url' && <Copy className='w-4 h-4 mr-1' />}
            {type === 'iframe' && <FileCode className='w-4 h-4 mr-1' />}
            {type === 'dscr' && <FileText className='w-4 h-4 mr-1' />}
            Copy {type.toUpperCase()}
            {copied === type && <span className='ml-2 text-green-300'>✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProfileBlinkCard
