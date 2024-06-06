import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { authGuard } from './shared/guard/auth.guard';
import { RegisterMenuComponent } from './register-menu/register-menu.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register-menu', component: RegisterMenuComponent},
    {path: 'register-admin', component: RegisterAdminComponent},
    {path: 'register-doctor', component: RegisterDoctorComponent},
    {path: 'app-navbar', component: NavbarComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent, data: {expectedRole: 'ADMIN'}, canActivate: [authGuard]},
    {path: 'doctor-dashboard', component: DoctorDashboardComponent, data: {expectedRole: 'DOCTOR'}, canActivate: [authGuard] },
    {path: 'app-list-admin', component: AdminDashboardComponent},
    {path: 'app-list-doctor', component: DoctorDashboardComponent},
];
