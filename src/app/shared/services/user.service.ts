import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {jwtDecode} from 'jwt-decode';
import { Credentials, LoggedInUser } from '../interface/user';

const API_URL = `${environment.apiURL}/api`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  user = signal<LoggedInUser | null>(null);

  constructor() {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const decodedTokenSubject = jwtDecode(access_token).sub as unknown as LoggedInUser;
      const decodedToken = jwtDecode(access_token) as LoggedInUser; // Add this line
      const decodeRole = decodedToken.role; // Update this line
      const decodeUsername = decodedToken.username; // Add this line
      this.user.set({
        username: decodeUsername,
        role: decodeRole, // Update this line
      });
    }

    effect(() => {
      if (this.user()) {
        console.log('User is logged in', this.user().username);
      } else {
        console.log('No user is logged in');
      }
    });
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{
      jwt: string; access_token: string 
}>(
      `${API_URL}/authenticate`,
      credentials,
    );
  }

  logoutUser() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
}
