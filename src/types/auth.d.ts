
export interface RegisterRequest {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface UserRequest {
  username: string
  password: string
}
export interface LoginResponse {
  id: number
  username: string
  email: string
  token: string
}