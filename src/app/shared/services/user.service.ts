import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Credentials, LoggedInUser, RegisterAdmin } from '../interface/user';
import { Observable } from 'rxjs';

// Define the base API URL from the environment configuration
const API_URL = `${environment.apiURL}/api`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Inject HttpClient and Router services
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  // Create a signal to store the logged-in user's information
  user = signal<LoggedInUser | null>(null);

  constructor() {
    // Check if an access token is stored in local storage
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      // Decode the access token to extract user information
      const decodedTokenSubject = jwtDecode(access_token).sub as unknown as LoggedInUser;
      const decodedToken = jwtDecode(access_token) as LoggedInUser;
      const decodeRole = decodedToken.role; 
      const decodeUsername = decodedToken.username; 

      // Set the user signal with the extracted user information
      this.user.set({
        username: decodeUsername,
        role: decodeRole, 
      });
    }

    // Effect to log when the user state changes
    effect(() => {
      if (this.user()) {
        console.log('User is logged in', this.user().username);
      } else {
        console.log('No user is logged in');
      }
    });
  }

  // Function to handle user login
  loginUser(credentials: Credentials): Observable<{ jwt: string; access_token: string }> {
    return this.http.post<{ jwt: string; access_token: string }>(
      `${API_URL}/authenticate`,
      credentials,
    );
  }

  // Function to register a new admin
  registerAdmin(registerAdmin: RegisterAdmin): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(`${API_URL}/user/register`, registerAdmin);
  }

  // Function to handle user logout
  logoutUser(): void {
    // Clear the user signal and remove the access token from local storage
    this.user.set(null);
    localStorage.removeItem('access_token');
    // Navigate to the login page
    this.router.navigate(['login']);
  }

  // Function to get the current user's role
  getRole(): string | undefined {
    return this.user()?.role;
  }

  // Function to check for duplicate username
  checkDublicateUsername(username: string): Observable<{ msg: string }> {
    return this.http.get<{ msg: string }>(`${API_URL}/user/check-username/${username}`);
  }

  // Function to check for duplicate email
  checkDublicateEmail(email: string): Observable<{ msg: string }> {
    return this.http.get<{ msg: string }>(`${API_URL}/user/check-email/${email}`);
  }
}
