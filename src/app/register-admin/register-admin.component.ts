import { Component, inject } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { RegisterAdmin } from '../shared/interface/user';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule ],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {

  // Inject the UserService and Router services
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
    const registerAdmin = this.form.value as RegisterAdmin;
    console.log('Registering Admin', registerAdmin);

    this.userService.registerAdmin(registerAdmin).subscribe({
      next: (response) => { 
        console.log('Registration Success', response);
        this.registrationStatus = {success: true, message: response.msg}
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error registering user', message);
        this.registrationStatus = { success: false, message };
      },
    });
  }


  // Function to validate the password and confirm password fields
  passwordMatchValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({passwordMissmatch: true});
    return {passwordMissmatch: true};
    }
    return {};
  }

  // Function to navigate to a different route
  navigateTo(route: string) {
    this.router.navigate([route])
  }

  // Function to check if the username is unique
  checkDublicateUsername() {
    const username = this.form.get('username').value;
    this.userService.checkDublicateUsername(username).subscribe({
      next: (response) => {
        console.log('Username is unique', response.msg);
        this.form.get('username').setErrors(null);
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Username is not unique', response);
        this.form.get('username').setErrors({duplicateUsername: true});
      },
    });
  }

  // Function to check if the email is unique
  checkDublicateEmail() {
    const email = this.form.get('email').value;
    this.userService.checkDublicateEmail(email).subscribe({
      next: (response) => {
        console.log(response.msg);
        this.form.get('email').setErrors(null);
      },
      error: (response) => {
        const message = response.msg;
        console.log(response.error);
        this.form.get('email').setErrors({duplicateEmail: true});
      },
    });
  }
}

