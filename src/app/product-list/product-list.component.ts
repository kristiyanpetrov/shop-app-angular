import {Component, OnInit} from '@angular/core';
import {Products} from '../_models/products.model';
import {CartService} from '../_services/cart.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // products: Array<Products> = products;
  products;
  config: any;
  searchField: string;

  constructor(private cartService: CartService,
              private router: Router) {
    this.config = {
      itemsPerPage: 6,
      currentPage: 1
    };
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  goToProduct(product) {
    this.router.navigate(['/products/' + product.id]);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
