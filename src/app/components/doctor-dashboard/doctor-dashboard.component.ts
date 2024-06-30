import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AppListDoctorComponent } from '../app-list-doctor/app-list-doctor.component';
@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, AppListDoctorComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

}
