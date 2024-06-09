import { Component, inject } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { RegisterDoctor } from '../shared/interface/doctor'; 
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { DoctorService } from '../shared/services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatOptionModule,
     CommonModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent {

  // Inject the UserService and Doctor services
  doctorService = inject(DoctorService);
  userService = inject(UserService);
  // Inject the Router service
  router = inject(Router);

  // Create a FormGroup instance to handle the form
  form = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      ssid: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      description: new FormControl('',),
      gender: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
    },
    this.passwordMatchValidator, // Add the passwordMatchValidator to the form group
  );

  // Create a registration status object to store the registration status
  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };

  // Function to handle form submission
  onSubmit(value: any) {
    console.log(value);
    const registerDoctor = this.form.value as RegisterDoctor;
    console.log('Registering Doctor', registerDoctor);

    this.doctorService.registerDoctor(registerDoctor).subscribe({
      next: (response) => {
        console.log('Registration Success', response);
        this.registrationStatus = { success: true, message: response.msg };
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Error registering user', message);
        this.registrationStatus = { success: false, message };
      },
    });
  }

  // Function to validate the password and confirm password fields
  passwordMatchValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  // Function to navigate to a different route
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Function to check if the username is unique
  checkDuplicateUsername() {
    const username = this.form.get('username').value;
    this.userService.checkDublicateEmail(username).subscribe({
      next: (response) => {
        console.log('Username is unique', response.msg);
        this.form.get('username').setErrors(null);
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Username is not unique', message);
        this.form.get('username').setErrors({ duplicateUsername: true });
      },
    });
  }

  // Function to check if the email is unique
  checkDuplicateEmail() {
    const email = this.form.get('email').value;
    this.userService.checkDublicateEmail(email).subscribe({
      next: (response) => {
        console.log(response.msg);
        this.form.get('email').setErrors(null);
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Email is not unique', message);
        this.form.get('email').setErrors({ duplicateEmail: true });
      },
    });
  }
}
