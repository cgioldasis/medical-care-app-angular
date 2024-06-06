import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject UserService and Router
  const userService = inject(UserService);
  const router = inject(Router);

  // Get the expected role from the route data
  const expectedRole = route.data['expectedRole'];

  // Check if the user is not logged in
  if (!userService.user()) {
    // Navigate to the login page if not logged in
    router.navigate(['login']);
    return false;
  }

  // Get the current user's role
  const role = userService.getRole();

  // Check if the user's role does not match the expected role
  if (role !== expectedRole) {
    // Navigate to the appropriate dashboard based on the user's role
    if (role === 'ADMIN') {
      router.navigate(['/admin-dashboard']);
    } else if (role === 'DOCTOR') {
      router.navigate(['/doctor-dashboard']);
    } else {
      router.navigate(['/login']);
    }
    return false;
  }

  // Allow navigation if the user's role matches the expected role
  return true;
};