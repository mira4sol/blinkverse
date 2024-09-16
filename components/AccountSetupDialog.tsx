'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { UserService } from '@/lib/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LoadingIcon from './ui/LoadingIcon'

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
})

export function AccountSetupDialog() {
  const { toast } = useToast()
  const { user, setUser } = useAuth()

  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values)

    setLoading(true)

    const updateUserReq = await UserService.updateUser(user?.pub_key || '', {
      name: values.username,
    })

    if (!updateUserReq.success) {
      setLoading(false)
      return toast({
        title: 'Unable to update profile',
        description: updateUserReq.message,
        variant: 'destructive',
      })
    }

    setUser(updateUserReq.data)
    toast({ title: 'Account set up successfully' })
    setLoading(false)
  }

  useEffect(() => {
    if (!user) return

    if (!user.name) setIsDialogOpen(true)
    else setIsDialogOpen(false)
  }, [user])

  return (
    <Dialog open={isDialogOpen}>
      {/* <DialogTrigger asChild> */}
      {/* <Button variant='outline'>Edit Profile</Button> */}
      {/* </DialogTrigger> */}
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Finish profile</DialogTitle>
              <DialogDescription>Update your profile.</DialogDescription>
            </DialogHeader>

            <div className='grid gap-4'>
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
            </div>

            <DialogFooter>
              <Button type='submit'>
                {loading && <LoadingIcon />}Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
