import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  getItems(): CartItem[] {
    return this.shoppingCartService.cartItems;
  }

  getTotal(): number {
      return this.shoppingCartService.getTotal();
  }

  addItem(menuItem: MenuItem) {
    this.shoppingCartService.addItem(menuItem);
  }

  removeItem(cartItem: CartItem) {
    this.shoppingCartService.removeItem(cartItem);
  }

  clear() {
    this.shoppingCartService.clear();
  }

}
