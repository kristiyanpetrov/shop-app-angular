import {Component, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {ActivatedRoute} from '@angular/router';
import {products} from '../_mock-data/products';
import {Products} from '../_models/products.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
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
    this.selectedColor = data.phoneColor;
    this.sideImages = data.path;
  }

  addToCart(product) {
    // assign selected options to obj properties
    product.color = this.selectedColor;
    product.price = this.selectedPrice;
    product.memorySize = this.selectedMemory;
    // push new value properties in new variable then we send it in cart service
    const newObject = Object.assign({}, product);

    // create var which hold details about the phone and use it in Swal
    const details = newObject.name + ' (' + newObject.memorySize + 'GB) - ' + newObject.color;
    Swal.fire({
      title: 'Add to cart?',
      text: details,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((item) => {
      if (item.value) {
        this.cartService.addToCart(newObject);
        Swal.fire(
          'Added successfully!',
          '',
          'success'
        );
      } else if (item.dismiss) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        );
      }
    });
  }

  selectPhoneMemory(data) {
    this.selectedMemory = data.size;
    // we change price when memory size is changed
    this.selectedPrice = data.price;
  }
}
