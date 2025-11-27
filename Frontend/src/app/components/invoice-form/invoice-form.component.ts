import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { Invoice, InvoiceItem } from 'src/app/models/invoice';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnInit {
  // lista de clientes y productos
  customers: Customer[] = [];
  products: Product[] = [];

  // datos de factura
  selectedCustomer: number = 0;
  invoiceDate: string = '';
  items: InvoiceItem[] = [];

  // totales
  totalSubtotal: number = 0;
  totalTax: number = 0;
  totalAmount: number = 0;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    public dialogRef: MatDialogRef<InvoiceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice | null }
  ) {}

  ngOnInit(): void {
    this.customerService.getAll().subscribe((customers) => {
      this.customers = customers;
    });

    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });

    this.invoiceDate = new Date().toISOString().split('T')[0];

    this.addItem();
  }

  addItem(): void {
    const newItem: InvoiceItem = {
      product: {} as Product,
      quantity: 0,
      unitPrice: 0,
      taxRate: 0,
      subtotal: 0,
      taxAmount: 0,
      totalLine: 0,
    };
    this.items.push(newItem);
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.calculateTotals();
  }
  onItemChange(index: number, updateItem: InvoiceItem): void {
    this.items[index] = updateItem;
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalSubtotal = this.items.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    this.totalTax = this.items.reduce(
      (total, item) => total + item.taxAmount,
      0
    );
    this.totalAmount = this.items.reduce(
      (total, item) => total + item.totalLine,
      0
    );
  }

  onSave(): void {
    if (this.selectedCustomer === 0) {
      alert('Debe seleccionar un cliente');
      return;
    }
    if (this.items.length === 0) {
      alert('Debe agregar al menos un item');
      return;
    }

    const selectedCustomer = this.customers.find(
      (customer) => customer.id === this.selectedCustomer
    );

    const invoice: Invoice = {
      invoiceDate: this.invoiceDate,
      customer: selectedCustomer!,
      items: this.items,
      totalSubtotal: this.totalSubtotal,
      totalTaxes: this.totalTax,
      totalInvoice: this.totalAmount,
    };

    this.invoiceService.createInvoice(invoice).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
