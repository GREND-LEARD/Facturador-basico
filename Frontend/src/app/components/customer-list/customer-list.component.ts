import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'identification',
    'phone',
    'actions',
  ];

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.LoadCustomers();
  }

  LoadCustomers(): void {
    this.customerService.getAll().subscribe((data) => {
      this.customers = data;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '400px',
      data: { customer: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService.createCustomer(result).subscribe(() => {
          this.LoadCustomers();
        });
      }
    });
  }

  openEditDialog(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '400px',
      data: { customer: customer },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService
          .updateCustomer(customer.id!, result)
          .subscribe(() => {
            this.LoadCustomers();
          });
      }
    });
  }

  deleteCustomer(id: number): void {
    if (confirm('Estas seguro de eliminar este cliente?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.LoadCustomers();
      });
    }
  }
}
