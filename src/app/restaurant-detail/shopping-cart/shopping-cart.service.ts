import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';

export class ShoppingCartService {

    cartItems: CartItem[] = [];

    clear() {
      this.cartItems = [];
    }

    addItem(menuItem: MenuItem) {
      let foundItem = this.cartItems.find(cartItem => cartItem.menuItem.id === menuItem.id);

      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        this.cartItems.push(new CartItem(menuItem));
      }
    }

    removeItem(cartItem: CartItem) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    getTotal(): number {
      return this.cartItems
        .map(cartItem => cartItem.getValue())
        .reduce((prev, value) => prev + value, 0);
    }

}
