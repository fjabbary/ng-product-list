import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
    })

  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0)
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(data => {
      console.log(data);
    });
  }

  checkout(cartItems: Product[]): void {
    this.cartService.checkout(cartItems).subscribe(data => {
      console.log(data);
    })
  }
}
