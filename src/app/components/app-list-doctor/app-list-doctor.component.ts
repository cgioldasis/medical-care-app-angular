import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../shared/interface/menu-item';

@Component({
  selector: 'app-app-list-doctor',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-list-doctor.component.html',
  styleUrl: './app-list-doctor.component.css'
})
export class AppListDoctorComponent {
  menu: MenuItem[] = [
    { text: 'Medicines', routerLink: 'medicine-admin-list' },
    { text: 'Patients', routerLink: 'patient-by-doctor-list' },
  ];
}