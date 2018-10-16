import { Component, OnInit, Injectable } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable, from } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
@Injectable()
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  searchBarState: string = "hidden";

  searchForm: FormGroup;

  searchControl: FormControl;

  constructor(
    private restaurantService: RestaurantsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.searchControl = this.formBuilder.control("");

    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(
          searchTerm => this.restaurantService
            .getRestaurants(searchTerm)
            .pipe(catchError(error => from([])))
        )
      ).subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === "hidden"? "visible" : "hidden";
  }

}
