import { Injectable } from '@angular/core';

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

@Injectable()
export class OrderService {

  constructor(private shoppingCartService: ShoppingCartService) {}

  cartItems(): CartItem[] {
    return this.shoppingCartService.cartItems;
  }

  increaseQuantity(cartItem: CartItem) {
    this.shoppingCartService.increaseQuantity(cartItem);
  }

  decreaseQuantity(cartItem: CartItem) {
    this.shoppingCartService.decreaseQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.shoppingCartService.removeItem(cartItem);
  }

  itemsValue(): number {
    return this.shoppingCartService.getTotal();
  }

}
