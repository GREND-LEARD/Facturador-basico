import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['id', 'name', 'identification', 'phone'];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.LoadCustomers();
  }

  LoadCustomers(): void {
    this.customerService.getAll().subscribe((data) => {
      this.customers = data;
    });
  }
}
