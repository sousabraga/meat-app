import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service';
import { User } from './user.model';
import { NotificationService } from '../../shared/messages/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  navigateTo: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });

    this.navigateTo = atob(this.activatedRoute.snapshot.params["to"]) || "/";
  }

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        user => this.notificationService.notify(`Bem vindo(a), ${user.name}!`),
        response => this.notificationService.notify(response.error.message),
        () => this.router.navigate([this.navigateTo])
      );
  }

}
