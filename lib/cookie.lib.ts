import Cookie from 'js-cookie'

export default class CookiesService {
  static async setter(key: string, value: string) {
    //? cookie setter
    //? catch all possible errors
    try {
      if (typeof window === 'undefined') return false //? Check if the code is running on the client.
      if (value === undefined) return false //? make sure the value sent isn't undefined
      value = JSON.stringify(value)
      await Cookie.set(key, value, {
        sameSite: 'strict',
      }) //? setting the value
      return true
    } catch (err) {
      return false
    }
  }
  static get(key: string) {
    //? cookie getter
    //? catch all possible errors
    try {
      //? CHECKS!
      if (typeof window === 'undefined') return undefined //? Check if the code is running on the client.
      if (!Cookie.get(key)) return undefined //? Check if the value exists
      if (typeof Cookie.get(key) === 'undefined') return undefined //? Check if the value is undefined. Probably the same as the first but, we can't be too careful.

      let value: any = Cookie.get(key)
      return JSON.parse(value) //? returning the value.
    } catch (err) {
      return undefined
    }
  }
  static remove(key: string) {
    //? cookie remover
    //? catch all possible errors
    try {
      //? CHECKS!
      if (typeof window === 'undefined') return false //? Check if the code is running on the client.
      if (!Cookie.get(key)) return false //? Check if the value exists
      if (typeof Cookie.get(key) === 'undefined') return false //? Check if the value is undefined. Probably the same as the first but, we can't be too careful.

      Cookie.remove(key)
      return true //? returning the value.
    } catch (err) {
      return false
    }
  }
}
