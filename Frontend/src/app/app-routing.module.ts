import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';

const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
