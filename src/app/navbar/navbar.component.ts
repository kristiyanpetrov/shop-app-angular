import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {ColorService} from '../_services/color.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  products;
  backgroundColor = '#343A40';

  constructor(private cartService: CartService,
              private colorService: ColorService) {
  }

  ngOnInit(): void {
    this.colorService.data$.subscribe((data) => {
        this.backgroundColor = data.color;
      }
    );
  }

  ngDoCheck(): void {
    this.products = this.cartService.products;
  }

}
