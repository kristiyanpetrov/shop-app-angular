import {Component, DoCheck, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  products = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.products = this.cartService.getProducts();
  }

}
