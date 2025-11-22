import { Customer } from './customer';
import { Product } from './product';

export interface Invoice {
  id?: number;
  invoiceDate: string;
  customer: Customer;
  items: InvoiceItem[];
  totalSubtotal: number;
  totalTaxes: number;
  totalInvoice: number;
}

export interface InvoiceItem {
  id?: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  totalLine: number;
}
