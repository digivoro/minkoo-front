export interface Community {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  identificationNumber: string;
  phone: string;
  profilePic: string;
}

export interface LoginResponse {
  access_token: string | null;
  user: User | null;
}
