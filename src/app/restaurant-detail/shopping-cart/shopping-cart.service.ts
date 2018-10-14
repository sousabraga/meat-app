import { Injectable } from '@angular/core';

import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';

import { NotificationService } from '../../shared/messages/notification.service';

@Injectable()
export class ShoppingCartService {

    cartItems: CartItem[] = [];

    constructor(private notificationService: NotificationService) {}

    clear() {
      this.cartItems = [];
    }

    addItem(menuItem: MenuItem) {
      let foundItem = this.cartItems.find(cartItem => cartItem.menuItem.id === menuItem.id);

      if (foundItem) {
        this.increaseQuantity(foundItem);
      } else {
        this.cartItems.push(new CartItem(menuItem));
      }

      this.notificationService.notify(`Você adicionou o item ${menuItem.name}`);
    }

    increaseQuantity(cartItem: CartItem) {
      cartItem.quantity += 1;
    }

    decreaseQuantity(cartItem: CartItem) {
      cartItem.quantity -= 1;

      if (cartItem.quantity === 0) {
        this.removeItem(cartItem);
      }
    }

    removeItem(cartItem: CartItem) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
      this.notificationService.notify(`Você removeu o item ${cartItem.menuItem.name}`);
    }

    getTotal(): number {
      return this.cartItems
        .map(cartItem => cartItem.getValue())
        .reduce((prev, value) => prev + value, 0);
    }

}
