import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../shared/services/patient.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent {
  registrationForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      ssid: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      diseaseDescription: ['', Validators.required]
    });
  }

  registerPatient(): void {
    if (this.registrationForm.valid) {
      const newPatient = this.registrationForm.value;
      this.patientService.addPatient(newPatient).subscribe({
        next: () => {
          this.successMessage = 'Patient registered successfully!';
          this.errorMessage = null;
          this.registrationForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Error registering patient.';
          this.successMessage = null;
          console.error('Error registering patient:', error);
        }
      });
    }
  }

  returnToList(): void {
    this.router.navigate(['doctor-dashboard/patient-by-doctor-list']);
  }
}
