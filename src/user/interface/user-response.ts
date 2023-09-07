export interface UserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserByEmailResponse {
  id: number;
  name: string;
  email: string;
  password: string;
}
