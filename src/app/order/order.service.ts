import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';

import { MEAT_API } from '../app.api';

@Injectable()
export class OrderService {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private httpClient: HttpClient
  ) {}

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

  clear() {
    this.shoppingCartService.clear();
  }

  checkOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${MEAT_API}/orders`, order);
  }

}
