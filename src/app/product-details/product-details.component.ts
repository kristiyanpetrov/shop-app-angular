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

  constructor(private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.product = products[+data.get('productId')];
    });
    // this.getPhoneMemory();
    this.img = this.product.image[0].path;
    this.selectedColor = this.product.image[0].phoneColor;
    this.selectedMemory = this.product.memory[0].size;
  }

  selectedPhoneColor(data) {
    this.img = data.path;
    this.selectedColor = data.phoneColor;
  }

  getPhoneMemory() {
    this.cartService.getMemorySize().subscribe((data) => {
      this.memorySize = Object.values(data);
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  selectPhoneMemory(data) {
    this.selectedMemory = data;
    console.log('this.selectedMemory', data);
  }

}
