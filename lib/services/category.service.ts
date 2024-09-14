import { CategoryInterface } from '@/interfaces/models.interface'
import { apiResponse } from '../api.helpers'
import { supabaseClient } from '../superbase_client.util'

export class CategoryService {
  static async getCategories() {
    try {
      const { data: categories, error } = await supabaseClient
        .from('category')
        .select('*')

      if (error)
        return apiResponse(
          false,
          error?.message || 'failed to get categories',
          error
        )

      return apiResponse<CategoryInterface[]>(
        true,
        'categories',
        categories || []
      )
    } catch (error: any) {
      console.log(`getUser: `, error?.message)
      return apiResponse(false, 'failed fetching categories', error?.message)
    }
  }
}
