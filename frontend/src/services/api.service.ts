import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseurl: string = 'http://localhost:8080/' 

  constructor (private http: HttpClient){}
  
  verifyUser(identifier: string, password: string) : Observable<any> {
    return this.http.post<any>(`${this.baseurl}/login.php`, { identifier,password })
  }
  
  verifyToken(token: string): Observable<any> {
    return this.http.get<any>(`{this.baseurl}/login.php`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  createUser(name: string, email: string, password: string, api_key: string, username: string) : Observable<any> {
    return this.http.post<any>(`${this.baseurl}/api.php`, { name, email, password, api_key, username
    })
  }

  refreshToken(refreshToken: string) : Observable<any>{
    return this.http.post<any>(`${this.baseurl}/refresh-token.php`, {
      refresh_token: refreshToken
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
  
  getSession(chat_session_id: Number){
    return this.http.post<any>(`${this.baseurl}/get-session-by-id.php`, {
      chat_session_id
    })
  }

  sendMessage(chat_session_id: Number, message: string){
    return this.http.post<any>(`${this.baseurl}/chat.php`, {
      chat_session_id, message
    })
  }

  getChatList(){
    return this.http.post<any>(`${this.baseurl}/get-chats-by-user.php`, {});
  }

  checkAdmin(){
    return this.http.get<any>(`${this.baseurl}/check-admin.php`);
  }
  
  getAllUsers(){
    return this.http.get<any>(`${this.baseurl}/get-all-users.php`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseurl}/delete-user.php?id=${id}`);
  }

  updateUserRole(id: number, role: string) {
    return this.http.post<any>(`${this.baseurl}/update-user-role.php`, {
      id, 
      role
    });
  }
}
