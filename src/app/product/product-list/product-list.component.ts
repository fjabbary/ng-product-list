import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = "";

  constructor(private productService: ProductService, private cartService: CartService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    })
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open(`${product.name} added to cart`, "", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    })
  }

  searchProduct(e: Event) {
    let query = (e.target as HTMLInputElement).value.toLocaleLowerCase();

    this.filteredProducts = this.products.filter(product => product.name.toLocaleLowerCase().includes(query))

    this.sort(this.sortOrder);
  }

  sort(sortValue: string): void {
    this.sortOrder = sortValue;

    switch (sortValue) {
      case 'asc-name':
        this.filteredProducts.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        break;

      case 'desc-name':
        this.filteredProducts.sort((a, b) => {
          return a.name > b.name ? -1 : 1;
        })
        break;

      case 'asc-price':
        this.filteredProducts.sort((a, b) => {
          return a.price - b.price;
        })
        break;

      case 'desc-price':
        this.filteredProducts.sort((a, b) => {
          return b.price - a.price;
        })
        break;
      default:
        break;
    }
  }
} 
