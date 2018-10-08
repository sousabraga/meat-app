import { Component, OnInit } from '@angular/core';

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {label: "Dinheiro", value: "MON"},
    {label: "Cartão de Débito", value: "DEB"},
    {label: "Cartão Refeição", value: "REF"}
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {}

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQuantity(cartItem: CartItem) {
    this.orderService.increaseQuantity(cartItem);
  }

  decreaseQuantity(cartItem: CartItem) {
    this.orderService.decreaseQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.orderService.remove(cartItem);
  }

}
