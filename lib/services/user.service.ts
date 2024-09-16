import { nanoid } from 'nanoid'
import { apiResponse } from '../api.helpers'
import { supabaseClient } from '../superbase_client.util'

export class UserService {
  static async getUser(pubKey: string) {
    try {
      const { data: users, error } = await supabaseClient
        .from('user')
        .select('*')
        .eq('pub_key', pubKey)

      if (error)
        return apiResponse(false, error?.message || 'failed to get user', error)

      return apiResponse(true, 'user details', users![0])
    } catch (error: any) {
      console.log(`getUser: `, error?.message)
      return apiResponse(false, 'failed fetching user', error?.message)
    }
  }

  static async getUserByName(user_name: string) {
    try {
      const { data: user, error } = await supabaseClient
        .from('user')
        .select('*')
        .eq('user_name', user_name)
      if (error)
        return apiResponse(false, error?.message || 'failed to get user', error)
      return apiResponse(true, 'user details', user![0])
    } catch (error: any) {
      console.log(`get single user:`, error?.message)
      return apiResponse(false, 'failed fetching user', error?.message)
    }
  }

  static async loginOrSignUp(pubKey: string) {
    try {
      const getUser = await UserService.getUser(pubKey)

      if (!getUser.success)
        return apiResponse(
          false,
          'user details',
          getUser?.message || 'something went wrong'
        )
      if (getUser.data) return apiResponse(true, 'user details', getUser.data)

      const { data: user, error } = await supabaseClient
        .from('user')
        .insert({ id: nanoid(21), pub_key: pubKey })
        .select()
        .single()

      if (error) return apiResponse(false, 'failed to save user', error.message)

      return apiResponse(true, 'user details', user)
    } catch (error: any) {
      console.log(`loginOrSignUp :`, error?.message)
      return apiResponse(false, 'failed saving user', error?.message)
    }
  }

  static async updateUser(
    pub_key: string,
    payload: {
      name?: string
      description?: string
    }
  ) {
    try {
      const getUser = await UserService.getUser(pub_key)

      if (!getUser.success)
        return apiResponse(
          false,
          'user details',
          getUser?.message || 'something went wrong'
        )

      const { data, error } = await supabaseClient
        .from('user')
        .update({ ...payload })
        .eq('pub_key', pub_key)
        .select()
        .single()

      if (error) return apiResponse(false, 'failed to save user', error.message)

      return apiResponse(true, 'user details', data)
    } catch (error: any) {
      console.log(`updateUser :`, error?.message)
      return apiResponse(false, 'failed saving user', error?.message)
    }
  }
}
