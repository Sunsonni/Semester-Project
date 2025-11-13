import { Injectable } from '@angular/core';
import User from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // TODO: hide url of API
  private baseurl: string = 'http://localhost:8888/semester-proj' 

  constructor (private http: HttpClient){}

  // async getUserById(id: number): Promise<User> {
  //   try {
  //     const response = await fetch(`${this.baseurl}/api.php/?id=${id}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error. status: ${response.status}`);
  //     }
  //     const data: User = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(`Error fetching user with ID ${id}`, error);
  //     throw error;
  //   }
  // }

  verifyUser(email: string, password: string) : Observable<any> {
    return this.http.post<any>(`${this.baseurl}/login.php`, { email,password });
  }
}
