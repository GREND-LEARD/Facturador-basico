import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer | null }
  ) {}

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });

    if (this.data.customer) {
      this.isEditMode = true;
      this.customerForm.patchValue({
        name: this.data.customer.name,
        identification: this.data.customer.identification,
        phone: this.data.customer.phone,
        address: this.data.customer.address,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      this.dialogRef.close(customerData);
    }
  }
}
