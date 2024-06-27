import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedicineService } from '../../shared/services/medicine.service';
import { Medicine, AddMedicine, UpdateMedicine } from '../../shared/interface/medicine';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  medicines: Medicine[] = [];
  filteredMedicines: Medicine[] = [];
  errorMessage: string | null = null;
  selectedMedicine: Medicine | null = null;
  deleteModalVisible = false;
  updateModalVisible = false;
  addModalVisible = false;
  addMedicineForm: FormGroup;
  updateMedicineForm: FormGroup;
  searchForm: FormGroup;

  constructor(private medicineService: MedicineService, private fb: FormBuilder) {
    this.addMedicineForm = this.fb.group({
      medicineName: ['', Validators.required],
      activeSubstance: ['', Validators.required],
      manufacturer: ['', Validators.required],
      manufactureDate: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });

    this.updateMedicineForm = this.fb.group({
      id: [''],
      medicineName: ['', Validators.required],
      activeSubstance: ['', Validators.required],
      manufacturer: ['', Validators.required],
      manufactureDate: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });

    this.searchForm = this.fb.group({
      medicalName: ['']
    });
  }

  ngOnInit(): void {
    this.fetchMedicines();
  }

  fetchMedicines(): void {
    this.medicineService.getMedicines().subscribe({
      next: (medicines: Medicine[]) => {
        this.medicines = medicines;
        this.filteredMedicines = medicines;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load medicines. Please try again later.';
        console.error('Error fetching medicines:', err);
      }
    });
  }

  searchMedicines(): void {
    const searchValue = this.searchForm.get('medicalName')?.value.toLowerCase();
    if (searchValue) {
      this.filteredMedicines = this.medicines.filter(medicine =>
        medicine.medicineName.toLowerCase().includes(searchValue)
      );
    } else {
      this.filteredMedicines = this.medicines;
    }
  }

  confirmDelete(medicine: Medicine): void {
    this.selectedMedicine = medicine;
    this.deleteModalVisible = true;
  }

  closeDeleteModal(): void {
    this.deleteModalVisible = false;
  }

  deleteMedicine(): void {
    if (this.selectedMedicine) {
      this.medicineService.deleteMedicine(this.selectedMedicine.id).subscribe({
        next: () => {
          this.fetchMedicines();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error(error);
          this.closeDeleteModal();
        }
      });
    }
  }

  openUpdateModal(medicine: Medicine): void {
    this.selectedMedicine = medicine;
    this.updateMedicineForm.patchValue(medicine);
    this.updateModalVisible = true;
  }

  closeUpdateModal(): void {
    this.updateModalVisible = false;
  }

  updateMedicine(): void {
    if (this.updateMedicineForm.valid) {
      const updatedMedicine: UpdateMedicine = this.updateMedicineForm.value;
      this.medicineService.updateMedicine(updatedMedicine).subscribe({
        next: () => {
          this.fetchMedicines();
          this.closeUpdateModal();
        },
        error: (error) => {
          console.error('Error updating medicine:', error);
        }
      });
    }
  }

  openAddModal(): void {
    this.addModalVisible = true;
  }

  closeAddModal(): void {
    this.addModalVisible = false;
  }

  addMedicine(): void {
    if (this.addMedicineForm.valid) {
      const newMedicine: AddMedicine = this.addMedicineForm.value;
      this.medicineService.addMedicine(newMedicine).subscribe({
        next: () => {
          this.fetchMedicines();
          this.addMedicineForm.reset();
          this.closeAddModal();
        },
        error: (error) => {
          console.error('Error adding medicine:', error);
        }
      });
    }
  }
}
