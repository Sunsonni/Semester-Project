import { Injectable } from '@angular/core';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // TODO: hide url of API
  private baseurl: string = 'http://localhost:8888/semester-proj/' 

  async getUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${this.baseurl}/api.php/?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error. status: ${response.status}`);
      }
      const data: User = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}`, error);
      throw error;
    }
  }

  async verifyUser(email: string, password: string) : Promise<User> {
    try {
      const response = await fetch(`${this.baseurl}/login.php`, {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error(`HTTP error. status: ${response.status}`);
      }
      const data: User = await response.json();
      return data;
    } catch (error) {
      console.error(`Error verifying user`, error);
      throw error;
    }
  }
}
