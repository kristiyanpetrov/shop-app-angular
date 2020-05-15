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
  sideImages = [];

  constructor(private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.product = products[+data.get('productId')];
    });
    this.defaultPhoneConfiguration();
  }

  sideImage(images) {
    this.img = images;
  }

  defaultPhoneConfiguration() {
    // this method is used to take specific data with index 0 by default, as we execute it in ngOnInit
    this.img = this.product.image[0].path[0].img;
    this.selectedColor = this.product.image[0].phoneColor;
    this.selectedMemory = this.product.memory[0].size;
    this.selectedPrice = this.product.memory[0].price;
    this.sideImages = this.product.image[0].path;
  }

  selectedPhoneColor(data) {
    this.img = data.path[0].img;
    console.log('this.img when select phone color', this.img);
    this.selectedColor = data.phoneColor;
    this.sideImages = data.path;
    console.log('this.sideImages', this.sideImages);
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
