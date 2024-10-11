'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { BlinkInterface } from '@/interfaces/models.interface'
import { BlinkService } from '@/lib/services/blink.service'
import {
  CheckCircle,
  Copy,
  Edit,
  ExternalLink,
  FileCode,
  FileText,
  MousePointer,
  Trash2,
  XCircle,
} from 'lucide-react'
import { Loading } from 'notiflix'
import { useState } from 'react'

interface Props {
  blink: BlinkInterface
  deleteBlink?: (blink_id: string) => void
}

const ProfileBlinkCard = ({ blink, deleteBlink }: Props) => {
  const { toast } = useToast()

  const [copied, setCopied] = useState<string>('')

  const copyToClipboard = (type: string) => {
    let url = ''

    if (type === 'blink') {
      url = `${window?.location?.origin}/verse/${blink.id}`
      // url = `solana-action:${window?.location?.origin}/api/actions/verse/${blink.id}`
    } else if (type === 'iframe') {
      url = ``
    } else if (type === 'dscr') {
      url = ``
    }

    navigator.clipboard.writeText(url)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
    toast({ title: 'Copied to clipboard' })
  }

  const handleDelete = async () => {
    Loading.circle()
    const deleteBlinkResp = await BlinkService.deleteBlink(blink.id)
    if (!deleteBlinkResp.success) {
      Loading.remove()
      return toast({
        title: 'Failed',
        description: deleteBlinkResp.message,
        variant: 'destructive',
      })
    }

    deleteBlink?.(blink.id)
    Loading.remove()

    toast({ title: 'Blink deleted successfully' })
  }

  return (
    // <div className='bg-gradient-to-r from-purple-600/30 to-indigo-600/30 backdrop-blur-sm rounded-lg p-6 border border-indigo-400/30 relative overflow-hidden group'>
    <div className='bg-transparent text-white backdrop-blur-sm rounded-lg p-6 border border-[#3B2655] relative overflow-hidden group'>
      <div className='absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <button className='p-1 bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300'>
          <Edit className='w-4 h-4 text-white' />
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300'>
              <Trash2 className='w-4 h-4 text-white' />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                blink.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h3 className='text-xl font-bold text-indigo-100 mb-2'>{blink.title}</h3>
      <p className='text-indigo-200 mb-4'>
        Category: <span className='capitalize'>{blink?.category?.name}</span>
      </p>
      <div className='flex items-center mb-4'>
        <ExternalLink className='w-5 h-5 text-indigo-300 mr-2' />
        <span className='text-indigo-100'>{blink.opened_count} views</span>
      </div>
      <div className='flex items-center mb-4'>
        <MousePointer className='w-5 h-5 text-indigo-300 mr-2' />
        <span className='text-indigo-100'>{blink.clicked_count} Clicks</span>
      </div>
      <div className='flex items-center mb-4'>
        <CheckCircle className='w-5 h-5 text-indigo-300 mr-2' />
        <span className='text-indigo-100'>
          {blink.tx_successful_count} Transaction sent
        </span>
      </div>
      <div className='flex items-center mb-4'>
        <XCircle className='w-5 h-5 text-indigo-300 mr-2' />
        <span className='text-indigo-100'>
          {blink.tx_failed_count} Transaction failed
        </span>
      </div>
      <div className='flex flex-wrap gap-2'>
        {['blink', 'iframe', 'dscr'].map((type) => (
          <button
            key={type}
            onClick={() => copyToClipboard(type)}
            className='flex items-center px-3 py-1 bg-indigo-600/50 hover:bg-indigo-500 rounded-full text-sm text-white transition-colors duration-300 disabled:opacity-50'
            disabled={type !== 'blink'}
          >
            {type === 'url' && <Copy className='w-4 h-4 mr-1' />}
            {type === 'iframe' && <FileCode className='w-4 h-4 mr-1' />}
            {type === 'dscr canvas' && <FileText className='w-4 h-4 mr-1' />}
            Copy {type.toUpperCase()}
            {copied === type && <span className='ml-2 text-green-300'>✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProfileBlinkCard
