import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DoctorAccessedByAdmin } from 'src/app/shared/interface/doctor';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors: DoctorAccessedByAdmin[] = [];
  errorMessage: string | null = null;
  selectedDoctor: DoctorAccessedByAdmin | null = null;
  deleteModalVisible = false;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (doctors: DoctorAccessedByAdmin[]) => {
        this.doctors = doctors;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load doctors. Please try again later.';
        console.error('Error fetching doctors:', err);
      }
    });
  }

  confirmDelete(doctor: DoctorAccessedByAdmin): void {
    this.selectedDoctor = doctor;
    this.deleteModalVisible = true;
  }

  closeDeleteModal(): void {
    this.deleteModalVisible = false;
  }

  deleteDoctor(): void {
    if (this.selectedDoctor) {
      this.doctorService.deleteDoctor(this.selectedDoctor.id).subscribe({
        next: (data) => {
          console.log(data);
          this.fetchDoctors();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error(error);
          this.closeDeleteModal();
        }
      });
    }
  }
}
