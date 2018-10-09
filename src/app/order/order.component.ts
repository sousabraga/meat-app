import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: "Dinheiro", value: "MON"},
    {label: "Cartão de Débito", value: "DEB"},
    {label: "Cartão Refeição", value: "REF"}
  ];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

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

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));

    this.orderService.checkOrder(order).subscribe((order: Order) => {
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    });
  }

}
