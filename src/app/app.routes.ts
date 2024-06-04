import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'app-navbar', component: NavbarComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'doctor-dashboard', component: DoctorDashboardComponent},
    {path: 'app-list-admin', component: AdminDashboardComponent},
    {path: 'app-list-doctor', component: DoctorDashboardComponent},
];
