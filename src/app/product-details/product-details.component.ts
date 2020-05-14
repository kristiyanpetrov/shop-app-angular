import {Component, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {ActivatedRoute} from '@angular/router';
import {products} from '../mock-data/products';
import {Products} from '../_models/products.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  memorySize: any = [];
  selectedMemory = [];
  img: string;
  selectedColor: string;
  selectedPrice: number;

  constructor(private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.product = products[+data.get('productId')];
    });

    this.defaultPhoneConfiguration();
  }

  defaultPhoneConfiguration() {
    this.img = this.product.image[0].path;
    this.selectedColor = this.product.image[0].phoneColor;
    this.selectedMemory = this.product.memory[0].size;
    this.selectedPrice = this.product.memory[0].price;
  }

  selectedPhoneColor(data) {
    this.img = data.path;
    this.selectedColor = data.phoneColor;
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  selectPhoneMemory(data) {
    this.selectedMemory = data.size;
    // we change price when memory size is changed
    this.selectedPrice = data.price;
  }

}
