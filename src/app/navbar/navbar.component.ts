import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Products} from '../_models/products.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  products: Array<Products>;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
  }

}
