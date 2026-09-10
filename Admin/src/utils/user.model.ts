// models/user.model.ts
export interface User {
  fullName: string;
  email: string;
  no_of_parcels: number;
}

export interface UserResource {

  id: number;

  fullName: string;

  email: string;

  parcelCount: number;

}

export interface UserEdit{
  id: number;
  fullName: string;
  email: string;
  password?: string;
  country: string;
  address: string;
  age?: number;
  note?: string;
  feedBack?: string;
  status: number;
  role: string;
}
