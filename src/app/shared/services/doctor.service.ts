import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterDoctor } from '../interface/doctor';




// Define the base API URL from the environment configuration
const API_URL = `${environment.apiURL}/api/doctor`;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  registerDoctor(doctor: RegisterDoctor) {
    return this.http.post<{ msg: string }>(`${API_URL}/register`, doctor);
  }
}
