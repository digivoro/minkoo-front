export interface Community {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
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
