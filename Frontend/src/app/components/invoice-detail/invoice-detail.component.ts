import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent {
  invoice!: Invoice;
  displayedColumns: string[] = [
    'product',
    'quantity',
    'unitPrice',
    'taxRate',
    'subtotal',
    'taxAmount',
    'totalLine',
  ];

  constructor(
    public dialogRef: MatDialogRef<InvoiceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice | null }
  ) {
    this.invoice = this.data.invoice!;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
