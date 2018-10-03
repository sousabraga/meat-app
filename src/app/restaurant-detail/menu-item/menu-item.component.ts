import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;

  @Output() addEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  emitAddEvent() {
    this.addEvent.emit(this.menuItem);
  }

}
