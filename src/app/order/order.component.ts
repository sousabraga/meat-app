import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;

  delivery: number = 8;

  order: Order;

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
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: new FormControl(this.loginService.user.name, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(this.loginService.user.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: new FormControl(this.loginService.user.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      address: new FormControl("", [Validators.required, Validators.minLength(5)]),
      number: new FormControl("", [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: new FormControl(""),
      paymentOption: new FormControl("", [Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'});
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get("email");
    const emailConfirmation = group.get("emailConfirmation");

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true};
    }

    return undefined;
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

    this.orderService.checkOrder(order)
      .pipe(tap((order: Order) => this.order = order))
      .subscribe((order: Order) => {
        this.router.navigate(['/order-summary']);
        this.orderService.clear();
      });
  }

  isOrderCompleted(): boolean {
    return this.order !== undefined;
  }

}
