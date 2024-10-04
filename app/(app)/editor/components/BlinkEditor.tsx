'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingIcon from '@/components/ui/LoadingIcon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { CategoryInterface } from '@/interfaces/models.interface'
import { BlinkService } from '@/lib/services/blink.service'
import { CategoryService } from '@/lib/services/category.service'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loading } from 'notiflix'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import EditorPreview from './EditorPreview'

const formSchema = z.object({
  title: z.string().min(3).max(20),
  category_id: z.string().min(3),
  image_url: z.string().min(3).optional(),
  description: z.string().min(5).max(100),
  label: z.string().min(0).max(20),
})

const BlinkEditor = () => {
  const { user } = useAuth()
  // const { publicKey } = useWallet()
  const router = useRouter()
  const { toast } = useToast()

  const [categories, setCategories] = useState<CategoryInterface[]>([])
  const [createBlinkLoader, setCreateBlinkLoader] = useState(false)

  const fetchCategories = async () => {
    Loading.circle()

    const categories = await CategoryService.getCategories()
    if (!categories.success)
      return toast({
        title: 'Unable to fetch categories',
        description: categories?.message,
        variant: 'destructive',
        action: <Button onClick={() => router.refresh()}>Refresh</Button>,
      })

    setCategories(categories.data)
    console.log('Categories', categories.data)
    Loading.remove()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      label: 'Send',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values)

    setCreateBlinkLoader(true)

    const createBlinkReq = await BlinkService.createBlink({
      user_id: user?.id || '',
      category_id: values.category_id,
      pub_key: user?.pub_key || '',
      title: values?.title,
      description: values?.description,
      image_url: values?.image_url,
      label: values.label,
    })

    if (!createBlinkReq.success) {
      setCreateBlinkLoader(false)
      return toast({
        title: 'Unable to create blink',
        description: createBlinkReq.message,
        variant: 'destructive',
      })
    }

    toast({ title: 'Blink Created' })
    setCreateBlinkLoader(false)
    await router.push('/profile')
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <section className='flex flex-col md:flex-row gap-10'>
      {/* Editor */}
      <div className='flex-1'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <Card className='bg-transparent'>
              <CardHeader>
                <CardTitle className='text-[20px] text-[#F0F0F0] font-monda'>
                  Blink Editor
                </CardTitle>
              </CardHeader>

              <CardContent className='grid gap-[24px]'>
                {/* Title field */}
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter title'
                          {...field}
                          className='bg-[#1F212A] border-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* End of title field */}

                {/* Image_url field */}
                <FormField
                  control={form.control}
                  name='image_url'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter title'
                          {...field}
                          className='bg-[#1F212A] border-none'
                        />
                      </FormControl>
                      <FormDescription>[optional]</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* End of image_url field */}

                {/* Description field */}
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Tell us about your blink'
                          className='bg-[#1F212A] border-none resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>[optional]</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* End of Description field */}

                {/* Blink Category Field */}
                <FormField
                  control={form.control}
                  name='category_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='bg-[#1F212A] border-none resize-none'>
                            <SelectValue placeholder='Select blink category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-[#1F212A]'>
                          {categories?.map((item) => (
                            <SelectItem
                              key={item?.id}
                              value={item?.id}
                              className='bg-[#1F212A] border-none resize-none'
                            >
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* End of Blink Category Field */}

                {/* Label Field */}
                {/* Title field */}
                <FormField
                  control={form.control}
                  name='label'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Label</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter button label'
                          {...field}
                          className='bg-[#1F212A] border-none'
                        />
                      </FormControl>
                      <FormDescription>Blink button display.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* End of title field */}
                {/* End of Label Field */}
              </CardContent>

              <CardFooter className='flex items-center justify-between'>
                <Link href={'/profile'}>
                  <Button variant={'destructive'}>Cancel</Button>
                </Link>
                <Button className='font-poppins font-medium bg-[#B073FF] hover:bg-[#B073FF] hover:bg-opacity-50 text-white'>
                  {' '}
                  {createBlinkLoader && <LoadingIcon />} Create Blink
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>

      {/* Preview */}
      <EditorPreview
        title={form.watch('title')}
        description={form.watch('description')}
        label={form.watch('label')}
        image_url={form.watch('image_url')}
      />
    </section>
  )
}

export default BlinkEditor
