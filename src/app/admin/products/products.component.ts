import { Component, OnInit } from '@angular/core';
import { products } from '../../_mock-data/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = products;
  config: any;
  searchField: string;

  constructor() {
    this.config = {
      itemsPerPage: 6,
      currentPage: 1
    };
  }

  ngOnInit(): void {
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
