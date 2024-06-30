import { Component, OnInit, inject } from '@angular/core';
import { PatientService } from '../../shared/services/patient.service';
import { Patient } from '../../shared/interface/patient';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-by-doctor-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './patient-by-doctor-list.component.html',
  styleUrl: './patient-by-doctor-list.component.css'
})
export class PatientByDoctorListComponent implements OnInit {
  patients: Patient[] = [];
  errorMessage: string | null = null;
  doctorUsername: string | null = null;
  selectedPatient: Patient | null = null;
  updateModalVisible = false;
  updatePatientForm: FormGroup;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.updatePatientForm = this.fb.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      ssid: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      diseaseDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.doctorUsername = this.userService.user()?.username || null;
    if (this.doctorUsername) {
      this.fetchPatientsByDoctor();
    } else {
      this.errorMessage = 'Failed to retrieve doctor information.';
    }
  }

  fetchPatientsByDoctor(): void {
    if (this.doctorUsername) {
      this.patientService.getPatientByDoctorUsername(this.doctorUsername).subscribe({
        next: (patients: Patient[]) => {
          this.patients = patients;
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load patients. Please try again later.';
          console.error('Error fetching patients:', err);
        }
      });
    }
  }

  openUpdateModal(patient: Patient): void {
    this.selectedPatient = patient;
    this.updatePatientForm.patchValue(patient);
    this.updateModalVisible = true;
  }

  closeUpdateModal(): void {
    this.updateModalVisible = false;
  }

  updatePatient(): void {
    if (this.updatePatientForm.valid) {
      const updatedPatient = this.updatePatientForm.value;
      this.patientService.updatePatient(updatedPatient).subscribe({
        next: () => {
          this.fetchPatientsByDoctor();
          this.closeUpdateModal();
        },
        error: (error) => {
          console.error('Error updating patient:', error);
        }
      });
    }
  }

  deletePatient(patient: Patient): void {
    if (confirm(`Are you sure you want to delete patient ${patient.firstname} ${patient.lastname}?`)) {
      this.patientService.deletePatient(patient.id).subscribe({
        next: () => this.fetchPatientsByDoctor(),
        error: (error) => console.error('Error deleting patient:', error)
      });
    }
  }

  addNewPatient(): void {
    this.router.navigate(['/doctor-dashboard/patient-registration']);
  }

  addTreatment(patient: Patient): void {
    this.router.navigate(['/doctor-dashboard/treatment', patient.ssid]);
  }

  returnToList(): void {
    this.router.navigate(['doctor-dashboard/patient-doctor-list']);
  }
}
