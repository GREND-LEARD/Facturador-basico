import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null }
  ) {}

  // formulario reactivo con 3 campos: name, code y unitPrice
  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      unitPrice: new FormControl('', Validators.required),
    });

    // si es edicion, se llena el formulario con los datos del producto
    if (this.data.product) {
      this.isEditMode = true;
      this.productForm.patchValue({
        name: this.data.product.name,
        code: this.data.product.code,
        unitPrice: this.data.product.unitPrice,
      });
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.dialogRef.close(productData);
    }
  }
}
