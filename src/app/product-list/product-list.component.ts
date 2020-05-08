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

  constructor() {
  }

  ngOnInit(): void {
  }

}
