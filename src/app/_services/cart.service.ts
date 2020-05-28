import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = [];
  backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  addToCart(product) {
    this.products.push(product);
  }

  getProducts() {
    const url = this.backendUrl + '/products';
    return this.http.get(url)
  }

  getProduct(id: number) {
    const url = this.backendUrl + '/products/' + id;
    return this.http.get(url);
  }

  updateProduct(data, id) {
    const url = this.backendUrl + '/products/' + id;
    return this.http.put(url, data);
  }

  getShippingDetails() {
    return this.http.get('/assets/shipping.json');
  }

  getMemorySize() {
    return this.http.get('/assets/memorySize.json');
  }

  clearCart() {
    this.products = [];
    return this.products;
  }
}
