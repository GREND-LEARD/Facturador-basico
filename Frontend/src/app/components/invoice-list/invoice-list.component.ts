import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  displayedColumns: string[] = ['id', 'invoiceDate', 'customerName', 'totalSubtotal', 'totalTaxes', 'totalInvoice', 'actions'];

  constructor(private invoiceService: InvoiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.LoadInvoices();
  }

  LoadInvoices(): void {
    this.invoiceService.getAll().subscribe((invoices) => {
      this.invoices = invoices;
    });
  }

  onAddInvoice(): void {
    const dialogRef = this.dialog.open(InvoiceFormComponent, {
      width: '800px',
      data: { invoice: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.LoadInvoices();
      }
    });
  }

  openInvoiceDetail(invoice: Invoice): void {
    const dialogRef = this.dialog.open(InvoiceDetailComponent, {
      width: '800px',
      data: { invoice },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.LoadInvoices();
      }
    });
  }
}
