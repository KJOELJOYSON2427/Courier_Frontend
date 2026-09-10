// create-user-request.model.ts
export interface CreateUserRequest {
  fullName: string;
  password: string;
  email: string;
  country: string;
  address: string;
  age: number;
}
