import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../shared/interface/menu-item';

@Component({
  selector: 'app-app-list-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-list-admin.component.html',
  styleUrl: './app-list-admin.component.css'
})
export class AppListAdminComponent {
  menu: MenuItem[] = [
    { text: 'User Status', routerLink: 'user-status' },
    { text: 'Doctors', routerLink: 'doctors-admin-list' },
    { text: 'Medicines', routerLink: 'medicine-admin-list' },
    {
      text: 'Patients',routerLink: 'patient-list',
    },
  ];
}
