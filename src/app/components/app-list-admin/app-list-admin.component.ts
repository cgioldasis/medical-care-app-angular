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
      text: 'Simple Datatable Example',
      routerLink: 'simple-datatable-example',
    },
    {
      text: 'Component Output Example',
      routerLink: 'component-output-example',
    },
    {
      text: 'Template Driven Form Example',
      routerLink: 'template-driven-form-example',
    },
    {
      text: 'Reactive Form Example',
      routerLink: 'reactive-form-example',
    },
    {
      text: 'HTTP Client Example',
      routerLink: 'http-client-example',
    },
    {
      text: 'User Registration Example',
      routerLink: 'user-registration-example',
    },
    {
      text: 'Restricted Content Example',
      routerLink: 'restricted-content-example',
    },
    { text: 'Fun for Nerds Game', routerLink: 'fun-for-nerds' },
    { text: 'CRUD Example', routerLink: 'crud-example' },
  ];
}
