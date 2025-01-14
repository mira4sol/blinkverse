import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { solanaRequests } from '@/lib/api_requests/solana.request'
// import { getTokenMetadata } from '@solana/spl-token'
import { useConnection } from '@solana/wallet-adapter-react'
import { Loading, Notify } from 'notiflix'
import { useEffect, useState } from 'react'

interface Props {
  title?: string
  image_url?: string
  description?: string
  label?: string
  token_mint?: string
  setTokenInfo?: (data: any) => void
}

const EditorPreview = ({
  title,
  description,
  image_url,
  label,
  token_mint,
  setTokenInfo,
}: Props) => {
  const { connection } = useConnection()
  const [previewData, setPreviewData] = useState<Props>({
    title: title || '',
    description: description || '',
    image_url: image_url || '',
    label: label || '',
    token_mint: '',
  })

  const getTokenInfo = async () => {
    Loading.dots()
    if (token_mint && token_mint.length > 0) {
      // Basic SPL token address validation - should be base58 encoded and 32-44 chars
      const isValidSPLAddress = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(token_mint)

      if (!isValidSPLAddress) {
        setPreviewData((prev) => ({
          ...prev,
          title: 'Invalid SPL Token Address',
          description: 'Please enter a valid Solana SPL token address',
        }))
        return
      }

      const { data, success, message } = await solanaRequests.getTokenMetaData(
        token_mint
      )

      if (!success) {
        Notify.failure(message, { position: 'right-bottom' })

        setPreviewData((prev) => ({
          ...prev,
          title: 'Invalid SPL Token Address',
          description: 'Please enter a valid Solana SPL token address',
        }))
        return
      }

      console.log('tokenInfo', data)

      setTokenInfo?.(data)
      setPreviewData((prev) => ({
        ...prev,
        title: data?.json?.name || data?.name || '',
        description: data?.json?.description || '',
        image_url: data?.json?.image || data?.image || '',
        label: 'Swap',
      }))
    }

    Loading.remove()
  }

  useEffect(() => {
    setPreviewData({
      title: token_mint,
      description,
      image_url,
      label,
      token_mint,
    })
  }, [title, description, image_url, label, token_mint])

  useEffect(() => {
    if (!connection) return

    getTokenInfo()
  }, [token_mint, connection])

  return (
    <Card className='flex-1'>
      <CardHeader>
        <img
          src={previewData.image_url || '/images/blink_img.png'}
          className='w-full h-full'
          alt='blink icon'
        />
      </CardHeader>

      <CardContent>
        <p className='font-semibold leading-none tracking-tight'>
          {previewData.title}
        </p>
        <p className='mt-1 whitespace-pre-wrap text-muted-foreground] text-sm text-slate-600'>
          {previewData.description}
        </p>
      </CardContent>

      <CardFooter>
        <div className='flex w-full items-center space-x-2'>
          <Input
            type='number'
            placeholder='Enter custom amount'
            className='w-full'
          />
          <Button className={``}>{previewData.label}</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default EditorPreview
