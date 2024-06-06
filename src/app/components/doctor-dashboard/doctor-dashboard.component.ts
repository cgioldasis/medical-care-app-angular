import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AppListAdminComponent } from '../app-list-admin/app-list-admin.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, AppListAdminComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

}
