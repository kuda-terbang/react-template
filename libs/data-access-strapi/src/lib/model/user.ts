/**
 * Type declaration
 */
export interface User {
  blocked: boolean
  confirmed: boolean
  createdAt: string
  email: string
  id: number
  provider: string
  updatedAt: string
  username: string
}

/**
 * Initial Declaration
 */
export const initialUser = {
  blocked: false,
  confirmed: false,
  createdAt: '',
  email: '',
  id: 1,
  provider: '',
  updatedAt: '',
  username: '',
}