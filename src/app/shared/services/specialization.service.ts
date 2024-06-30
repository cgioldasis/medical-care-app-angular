import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Specialization } from '../interface/specialization';
import { Observable } from 'rxjs';


const API_URL = `${environment.apiURL}/api/specialization`;

@Injectable({
  providedIn: 'root'
})

export class SpecializationService {

http: HttpClient = inject(HttpClient);


  getSpecializations() {
    return this.http.get<Specialization[]>(`${API_URL}/all`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

}
