import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-menu',
  standalone: true,
  imports: [],
  templateUrl: './register-menu.component.html',
  styleUrl: './register-menu.component.css'
})
export class RegisterMenuComponent {

  router = inject(Router);

  navigateTo(route: string) {
    this.router.navigate([route])
  }
}
