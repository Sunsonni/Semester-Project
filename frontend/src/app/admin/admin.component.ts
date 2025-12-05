import { Component } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  imports: [
    NgIf,
    NgFor,
    NgClass
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  //TODO: switch to signal
  users: any[] = [];
  loading = true;

  constructor(
    private api: ApiService
  ){}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.api.getAllUsers().subscribe({
      next: response => {
        this.users = response.users;
        this.loading = false;
      }
    });
  }

  deleteUser(id: number) {
    if(!confirm("Delete this user?")) return;

    this.api.deleteUser(id).subscribe({
      next: () => this.loadUsers()
    });
  }

  toggleRole(user: any) {
    const newRole = user.role === 'admin' ? 'user' : 'admin';

    this.api.updateUserRole(user.id, newRole).subscribe({
      next: () => this.loadUsers()
    })
  }
}
