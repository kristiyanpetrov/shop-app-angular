import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = [];
  backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  addToCart(product) {
    this.products.push(product);
  }

  getProducts() {
    const url = '/products';
    return this.http.get(url)
  }

  getProduct(id: number) {
    const url = '/products/' + id;
    return this.http.get(url);
  }

  updateProduct(data, id) {
    const url = '/products/' + id;
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
