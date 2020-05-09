import {Component, OnInit} from '@angular/core';
import {products} from '../mock-data/products';
import {Products} from '../_models/products.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Array<Products> = products;
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
