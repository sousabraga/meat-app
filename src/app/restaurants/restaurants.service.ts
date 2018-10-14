import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Restaurant } from './restaurant/restaurant.model';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

import { MEAT_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';

@Injectable()
export class RestaurantsService {

  constructor(private httpClient: HttpClient) {}

  getRestaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;

    if (search) {
      params = new HttpParams().set("q", search);
    }

    return this.httpClient.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params});
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
  }

  getReviewsOfRestaurant(id: string): Observable<any> {
    return this.httpClient.get(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  getMenuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
  }

}
