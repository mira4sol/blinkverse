/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useToast } from '@/hooks/use-toast'
import {
  AuthContextProps,
  ReactChildrenProps,
  UserInterface,
} from '@/interfaces'
import { COOKIE_USER_DATA_KEY } from '@/lib/constants/app.constants'
import CookiesService from '@/lib/cookie.lib'
import { UserService } from '@/lib/services/user.service'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

//? initial context state
const initialAuthState: AuthContextProps = {
  isLoggedIn: false,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user: any) => null,
}

//? declaration of auth context
export const AuthContext = createContext<AuthContextProps>(initialAuthState)

//? utility function that returns the useContext
export const useAuth = () => {
  return useContext(AuthContext)
}

export default function AuthContextProvider({ children }: ReactChildrenProps) {
  const { publicKey } = useWallet()
  const { toast } = useToast()
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(!!publicKey) //? isLoggedIn state

  useEffect(() => {
    setIsLoggedIn(!!publicKey)

    if (!publicKey && isLoggedIn) logout()
    else fetchProfile()
  }, [publicKey])

  const [user, setUser] = useState<UserInterface | null>(
    CookiesService.get(COOKIE_USER_DATA_KEY)
  ) //? user state

  //? function to log a user out
  const logout = () => {
    // CookiesService.remover(COOKIE_TOKEN_KEY)
    CookiesService.remove(COOKIE_USER_DATA_KEY)
    setIsLoggedIn(false)
    setUser(null)
    router.replace('/')
  }

  // ? function to set user to cookie and state
  const handleSetUser = (passedUser: any) => {
    const newUser = { ...user, ...passedUser }
    CookiesService.setter(COOKIE_USER_DATA_KEY, newUser)
    setUser(newUser)
  }

  const fetchProfile = async () => {
    if (!publicKey) return

    const getUser = await UserService.loginOrSignUp(publicKey?.toString())
    if (!getUser.success)
      return toast({
        title: 'failed to fetch profile',
        description: getUser?.message || 'Error Occurred',
        variant: 'destructive',
      })

    console.log('user', getUser.data)
    handleSetUser(getUser.data)
  }

  //? declaring value that will be passed down the app through the AuthContext's provider.
  const authContextValue: AuthContextProps = {
    isLoggedIn,
    user,
    setUser: handleSetUser,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
