import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'code', 'unitPrice', 'actions'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.LoadProducts();
  }

  LoadProducts(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: { product: null }, // null = modo CREAR
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.createProduct(result).subscribe(() => {
          this.LoadProducts();
        });
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: { product: product }, // product = modo ACTUALIZAR
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.updateProduct(product.id!, result).subscribe(() => {
          this.LoadProducts();
        });
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Estas seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.LoadProducts();
      });
    }
  }
}
