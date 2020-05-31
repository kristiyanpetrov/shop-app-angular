import {Component, OnInit} from '@angular/core';
import {products} from '../../_mock-data/products';
import {CartService} from '../../_services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products;
  config: any;
  searchField: string;

  constructor(private cartService: CartService,
              private route: Router) {
    this.config = {
      itemsPerPage: 6,
      currentPage: 1
    };
  }

  ngOnInit(): void {
    this.getProducts();
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  getProducts() {
    this.cartService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  goToProductId(id) {
    this.route.navigate(['/admin/products/edit/' + id]);
  }
}
