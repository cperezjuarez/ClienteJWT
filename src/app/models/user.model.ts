export interface User {
  username: string;
  email: string;
  role: string;
  token: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  role: string;
}