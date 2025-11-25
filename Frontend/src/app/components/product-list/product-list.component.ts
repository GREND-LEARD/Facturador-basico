import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'code', 'unitPrice'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.LoadProducts();
  }

  LoadProducts(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}
