import { UserInterface } from '.'

export interface AuthContextProps {
  isLoggedIn: boolean
  user: UserInterface | null
  setUser: (user: UserInterface) => void
}
