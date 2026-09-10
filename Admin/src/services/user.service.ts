import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../utils/create-user-request.model';
import { UserEdit } from '../utils/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  private baseUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) {}

  registerUser(payload: CreateUserRequest): Observable<any> {

    return this.http.post(`${this.baseUrl}/auth/register`, payload);
  }



  // getAllUsers(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/user/`);
  // }


  getAllUsers(
  page: number,
  size: number,
  email?: string,
  id?: number,
  sortDir: 'asc' | 'desc' = 'desc'
): Observable<any> {
   let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('sortBy', 'createdAt')
    .set('sortDir', sortDir);

  if (email) {
    params = params.set('email', email);
  }

  if (id) {
    params = params.set('id', id);
  }

  return this.http.get(`${this.baseUrl}/user`, { params });
}

  getUserById(id: number): Observable<UserEdit> {
    return this.http.get<UserEdit>(`${this.baseUrl}/user/${id}`);
  }

  updateUser(id: number, user: UserEdit): Observable<UserEdit> {
    return this.http.put<UserEdit>(`${this.baseUrl}/user/${id}`, user);
  }
}
