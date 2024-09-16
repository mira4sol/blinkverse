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

  created_at: Date
  updated_at?: Date
}

export interface CategoryInterface {
  id: string
  name: string

  created_at: Date
}
