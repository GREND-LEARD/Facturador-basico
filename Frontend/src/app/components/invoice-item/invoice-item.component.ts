import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { InvoiceItem } from 'src/app/models/invoice';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css'],
})
export class InvoiceItemComponent implements OnInit {
  // recibe del padre
  @Input() products: Product[] = [];
  @Input() item: InvoiceItem | null = null;

  selectedProductId: number = 0;
  quantity: number = 0;
  unitPrice: number = 0;
  taxRate: number = 0;
  subtotal: number = 0;
  taxAmount: number = 0;
  totalLine: number = 0;
  // Envia al padre
  @Output() itemChange = new EventEmitter<InvoiceItem>();
  @Output() remove = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.item) {
      this.selectedProductId = this.item.product.id!;
      this.quantity = this.item.quantity;
      this.unitPrice = this.item.unitPrice;
      this.taxRate = this.item.taxRate;
      this.subtotal = this.item.subtotal;
      this.taxAmount = this.item.taxAmount;
      this.totalLine = this.item.totalLine;
    }
  }

  // 1. Buscar producto
  onChange(): void {
    const selectedProduct = this.products.find(
      (product) => product.id === this.selectedProductId
    );

    // 2. Valida y calcula
    if (selectedProduct && this.quantity > 0) {
      this.subtotal = selectedProduct.unitPrice * this.quantity;
      this.taxAmount = this.subtotal * (this.taxRate / 100);
      this.totalLine = this.subtotal + this.taxAmount;

      // 3. Crear objeto
      const updateItem: InvoiceItem = {
        product: selectedProduct,
        quantity: this.quantity,
        unitPrice: selectedProduct.unitPrice,
        taxRate: this.taxRate,
        subtotal: this.subtotal,
        taxAmount: this.taxAmount,
        totalLine: this.totalLine,
      };

      // 4. Emitir al padre (@Output)
      this.itemChange.emit(updateItem);
    }
  }
  onRemove(): void {
    this.remove.emit();
  }
}
