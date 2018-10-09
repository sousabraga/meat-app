import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  orderForm: FormGroup;

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: "Dinheiro", value: "MON"},
    {label: "Cartão de Débito", value: "DEB"},
    {label: "Cartão Refeição", value: "REF"}
  ];

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPattern = /^[0-9]*$/;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control("", [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control("", [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control("", [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(""),
      paymentOption: this.formBuilder.control("", [Validators.required])
    });
  }

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
