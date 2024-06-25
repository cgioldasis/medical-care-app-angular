import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DoctorAccessedByAdmin, RegisterDoctor } from '../interface/doctor';
import { Observable } from 'rxjs';




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
  getDoctors(): Observable<DoctorAccessedByAdmin[]> {
    return this.http.get<DoctorAccessedByAdmin[]>(`${API_URL}/admin-list`,{
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  deleteDoctor(doctorId: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${API_URL}/delete/${doctorId}`,{
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }
}
