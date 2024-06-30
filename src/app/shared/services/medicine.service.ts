import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddMedicine, Medicine, UpdateMedicine } from '../interface/medicine';


// Define the base API URL from the environment configuration
const API_URL = `${environment.apiURL}/api/medicine`;

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  getMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${API_URL}/all`,{
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  addMedicine(medicine: AddMedicine): Observable<Medicine> {
    return this.http.post<Medicine>(`${API_URL}/add`, medicine, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });

  }

  updateMedicine(medicine: UpdateMedicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${API_URL}/update/${medicine.id}`, medicine, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }
}
