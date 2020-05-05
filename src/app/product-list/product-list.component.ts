import {Component, OnInit} from '@angular/core';
import {products} from '../mock-data/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products = products;
  config: any;

  constructor() {
    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
    };
  }

  ngOnInit(): void {
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
