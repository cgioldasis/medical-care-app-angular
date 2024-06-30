import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../shared/services/patient.service';
import { Patient } from '../../shared/interface/patient';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'patient-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  errorMessage: string | null = null;
  selectedPatient: Patient | null = null;
  updateModalVisible = false;
  updatePatientForm: FormGroup;

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private router: Router
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
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.patientService.getPatients().subscribe({
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
          this.fetchPatients();
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
        next: () => this.fetchPatients(),
        error: (error) => console.error('Error deleting patient:', error)
      });
    }
  }
}
