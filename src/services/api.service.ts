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

  verifyToken(token: string): Observable<any> {
    return this.http.get<any>(`{this.baseurl}/login.php`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  
  verifyUser(identifier: string, password: string) : Observable<any> {
    return this.http.post<any>(`${this.baseurl}/login.php`, { identifier,password })
  }

  createUser(name: string, email: string, password: string, api_key: string, username: string) : Observable<any> {
    return this.http.post<any>(`${this.baseurl}/api.php`, { name, email, password, api_key, username
    })
  }

  getAPIKey() : Observable<any> {
    return this.http.post<any>(`${this.baseurl}/get-api-key.php`, {});
  }

  createSession(title: string, flavor: string) : Observable<any> {
    return this.http.post<any>(`${this.baseurl}/create-session.php`, {
      title, flavor
    })
  }

  refreshToken(refreshToken: string) : Observable<any>{
    return this.http.post<any>(`${this.baseurl}/refresh-token.php`, {
      refresh_token: refreshToken
    })
  }
  
}
