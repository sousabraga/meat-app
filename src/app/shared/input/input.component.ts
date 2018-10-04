import { Component, OnInit, AfterContentInit, Input, ContentChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any;

  @Input() label: string;

  @Input() errorMessage: string;

  @ContentChild(NgModel) model: NgModel;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.input = this.model;

    if (this.input === undefined) {
      throw new Error('Esse component precisa ser utilizado com uma diretiva ngModel');
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

}
