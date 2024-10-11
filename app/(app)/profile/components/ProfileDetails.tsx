'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingIcon from '@/components/ui/LoadingIcon'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { UserInterface } from '@/interfaces'
import { UserService } from '@/lib/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must not exceed 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, underscores'
    )
    .refine(
      (username) => !username.startsWith('-') && !username.endsWith('-'),
      {
        message: 'Username cannot start or end with a hyphen',
      }
    ),
  description: z.string().max(100, 'Username must not exceed 20 characters'),
})

const ProfileDetails = () => {
  const { user, setUser } = useAuth()
  const { toast } = useToast()

  const [localUser, setLocalUser] = useState<UserInterface>()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    setLoading(true)

    const updateUserReq = await UserService.updateUser(user?.pub_key || '', {
      name: values.username,
      description: values.description,
    })

    if (!updateUserReq.success) {
      setLoading(false)
      return toast({
        title: 'Unable to update account',
        description: updateUserReq.message,
        variant: 'destructive',
      })
    }

    setUser(updateUserReq.data)
    toast({ title: 'Account set up successfully' })
    setLoading(false)
    setIsEditing(false)
  }

  useEffect(() => {
    if (!user) return

    setLocalUser(user)
    form.setValue('username', localUser?.name || '')
    form.setValue('description', localUser?.description || '')
  }, [user])

  return (
    <div className='w-full'>
      <div className='rounded-lg p-5'>
        <div className='flex justify-between items-start mb-6'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>Verse</h1>
            {localUser?.name && (
              <p className='text-indigo-300'>@{localUser?.name || ''}</p>
            )}
          </div>
          <button
            onClick={
              isEditing
                ? form.handleSubmit(onSubmit)
                : () => setIsEditing(!isEditing)
            }
            className='bg-purple-600 hover:bg-purple-700 text-white px-2 py-2 rounded-full flex items-center transition-colors duration-300'
          >
            {loading ? (
              <LoadingIcon className='w-4 h-4' />
            ) : (
              <Pen className='w-4 h-4' />
            )}{' '}
            {isEditing ? '' : ''}
          </button>
        </div>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* <div className='space-y-4'> */}

              {/* username field */}
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter username' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End of username field */}

              {/* description field */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Enter description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End of description field */}

              {/* <textarea
                value={''}
                className='w-full bg-indigo-700/50 border border-indigo-500 rounded-lg px-4 py-2 text-white'
                rows={3}
              /> */}
              {/* </div> */}
            </form>
          </Form>
        ) : (
          <div>
            <span className='text-slate-300/50 text-xs leading-none'>
              description
            </span>
            <p className='text-indigo-200 leading-none'>
              {localUser?.description ? localUser?.description : 'N/A'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileDetails
