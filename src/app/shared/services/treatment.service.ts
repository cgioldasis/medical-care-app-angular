import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddTreatment, Treatment, UpdateTreatment } from '../interface/treatment';

const API_URL = `${environment.apiURL}/api/treatment`;
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  // Inject HttpClient
  http: HttpClient = inject(HttpClient);

  getTreatmentByPatientSsid(ssid: string): Observable<Treatment> {
    return this.http.get<Treatment>(`${API_URL}/patient/${ssid}`,
      {
        headers: {
          Authorization: ` ${localStorage.getItem('access_token')}`,
        }
      });
  }

  addTreatment(treatment: AddTreatment): Observable<AddTreatment> {
    return this.http.post<AddTreatment>(`${API_URL}/insert`, treatment, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  updateTreatment(treatment: UpdateTreatment): Observable<UpdateTreatment> {
    return this.http.put<UpdateTreatment>(`${API_URL}/update/${treatment.id}`, treatment, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  deleteTreatment(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  
}
