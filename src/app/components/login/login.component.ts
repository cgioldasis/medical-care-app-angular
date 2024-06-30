import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Credentials, LoggedInUser } from 'src/app/shared/interface/user';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);

  invalidLogin = false;
  errorMessage = '';

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
     const credentials = this.form.value as Credentials;
     this.userService.loginUser(credentials).subscribe({
       next: (response) => {
         const access_token = response.jwt;
         localStorage.setItem('access_token', access_token);
         const decodedToken = jwtDecode(access_token) as LoggedInUser; 
         const decodeRole = decodedToken.role; 
         const decodeUsername = decodedToken.username; 
          console.log('Role', decodeRole); 
          console.log('Username', decodeUsername); 
          

         this.userService.user.set({
           username: decodeUsername,
           role: decodeRole, 

         });
         if (decodeRole === 'ADMIN') {
           this.router.navigate(['admin-dashboard']);
          } else if (decodeRole === 'DOCTOR') {
            this.router.navigate(['doctor-dashboard']);
          }
      },
      error: (response) => {
        console.error('Login Error', response);
        if (response.status === 403) {
          this.errorMessage = 'UNAUTHORIZED ACCESS';
        } else {
          this.invalidLogin = true;
          this.errorMessage = '';
        }
      }
     });
   }

   checkStatus() {
    return this.errorMessage;
  }

  navigateToRegisterMenu() {
    this.router.navigate(['register-menu']);
  }

}
