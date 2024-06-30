import { Component, OnInit, inject } from '@angular/core';
import { AddTreatment, Treatment } from 'src/app/shared/interface/treatment';
import { TreatmentService } from '../../shared/services/treatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicineService } from 'src/app/shared/services/medicine.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Medicine } from 'src/app/shared/interface/medicine';

@Component({
  selector: 'treatment',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: './treatment.component.html',
  styleUrl: './treatment.component.css'
})
export class TreatmentComponent implements OnInit {
  treatment: Treatment;
  errorMessage: string | null = null;
  patientSsid: string | null = null;
  treatmentForm: FormGroup;
  medicines: Medicine[];

  treatmentService = inject(TreatmentService);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private router: Router,
  ) {
    this.treatmentForm = this.fb.group({
      treatmentName: ['', Validators.required],
      patientSsid: [null], 
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      medicineNames: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.patientSsid = this.route.snapshot.paramMap.get('ssid');
    this.treatmentForm.get('patientSsid').setValue(this.patientSsid);
    console.log("Retrieved SSID:", this.patientSsid);

    if (this.patientSsid) {
      this.fetchTreatment(this.patientSsid);
      this.fetchMedicines();
    }
  }
  

  fetchTreatment(ssid: string): void {
    this.treatmentService.getTreatmentByPatientSsid(ssid).subscribe({
      next: (treatment) => {
        this.treatment = treatment;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'No treatment found for this patient.';
        console.error('Error fetching treatment:', error);
      }
    });
  }

  fetchMedicines(): void {
    this.medicineService.getMedicines().subscribe({
      next: (medicines) => {
        this.medicines = medicines;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load medicines.';
        console.error('Error fetching medicines:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.treatmentForm.valid) {
      const formValue = this.treatmentForm.value;
      const treatmentData: AddTreatment = {
        treatmentName: formValue.treatmentName,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        medicineNames: formValue.medicineNames,
        patientSsid: formValue.patientSsid
      };

      this.treatmentService.addTreatment(treatmentData).subscribe({
        next: () => {
          this.fetchTreatment(this.patientSsid!);
          this.clearForm();
        },
        error: (error) => {
          this.errorMessage = 'Failed to create treatment.';
          console.error('Error creating treatment:', error);
        }
      });
    }
  }

  clearForm(): void {
    this.treatmentForm.reset();
  }

  returnToPatientList(): void {
    this.router.navigate(['/doctor-dashboard/patient-by-doctor-list']);
  }

  deleteTreatment(): void {
    if (confirm('Are you sure you want to delete this treatment?')) {
      if (this.treatment && this.treatment.id) {
        this.treatmentService.deleteTreatment(this.treatment.id).subscribe({
          next: () => {
            alert('Treatment deleted successfully.');
            this.returnToPatientList();  // Redirect after successful deletion
          },
          error: (error) => {
            console.error('Error deleting treatment:', error);
            alert('Failed to delete treatment.');
          }
        });
      } else {
        alert('No treatment ID found.');
      }
    }
  }
  
}
