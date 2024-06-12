import { Component, OnInit, inject } from '@angular/core';
import { UpdateUserStatus, UsersWithStatus } from 'src/app/shared/interface/user';
import { UserService } from 'src/app/shared/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  standalone: true,
  styleUrls: ['./user-status.component.css'],
  imports: [CommonModule]
})
export class UserStatusComponent implements OnInit {

  userService = inject(UserService);
  users: UsersWithStatus[] = [];

  constructor() { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsersWithStatus().subscribe({
      next:(data: UsersWithStatus[]) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  approveUser(user: UsersWithStatus): void {
    const updatedUser : UpdateUserStatus = {
      id: user.id,
      status: 'APPROVED'
    };
    updatedUser.status = 'APPROVED';
    this.userService.updateUserStatus(updatedUser).subscribe({
      next: (data) => {
        console.log(data);
        this.getUsers();
        
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  rejectUser(user: UsersWithStatus): void {
    const updatedUser : UpdateUserStatus = {
      id: user.id,
      status: 'REJECTED'
    };
    this.userService.updateUserStatus(updatedUser).subscribe({
      next: (data) => {
        console.log(data);
        this.getUsers();
        
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  

}
