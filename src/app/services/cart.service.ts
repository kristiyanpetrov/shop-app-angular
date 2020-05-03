import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = [];

  constructor(private http: HttpClient) {
  }

  addToCart(product) {
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getShippingDetails() {
    return this.http.get('/assets/shipping.json');
  }

  clearCart() {
    this.products = [];
    return this.products;
  }
}
