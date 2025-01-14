export interface UserInterface {
  id: string
  pub_key: string
  name?: string
  description?: string

  created_at: Date
  updated_at?: Date
}

export interface BlinkInterface {
  id: string
  user_id: string
  category_id: string
  title: string
  image_url?: string
  description?: string
  label?: string
  pub_key: string
  token_mint?: string

  opened_count: number
  clicked_count: number
  tx_successful_count: number
  tx_failed_count: number

  created_at: Date
  updated_at?: Date

  // relations
  category?: CategoryInterface
}

export interface CategoryInterface {
  id: string
  name: string

  created_at: Date
}
