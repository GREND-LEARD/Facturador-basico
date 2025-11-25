import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  displayedColumns: string[] = ['id', 'invoiceDate', 'customerName', 'totalSubtotal', 'totalTaxes', 'totalInvoice'];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.LoadInvoices();
  }

  LoadInvoices(): void {
    this.invoiceService.getAll().subscribe((invoices) => {
      this.invoices = invoices;
    });
  }
}
