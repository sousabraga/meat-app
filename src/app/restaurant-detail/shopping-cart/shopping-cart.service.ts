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
        this.increaseQuantity(foundItem);
      } else {
        this.cartItems.push(new CartItem(menuItem));
      }
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
    }

    getTotal(): number {
      return this.cartItems
        .map(cartItem => cartItem.getValue())
        .reduce((prev, value) => prev + value, 0);
    }

}
