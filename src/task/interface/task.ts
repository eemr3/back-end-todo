export interface TaskCreateResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskGetResponse {
  id: number;
  title: string;
  description: string;
  status: boolean;
  User: {
    userId: number;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
