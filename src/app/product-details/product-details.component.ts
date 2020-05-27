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
  id: number = null;

  constructor(private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProduct();
  }

  getProduct() {
    this.cartService.getProduct(this.id).subscribe((res: any) => {
      this.product = res;
      // assign first property from obj arr in var when load page
      this.img = res.image[0].path[0].img;
      this.sideImages = res.image[0].path;
      this.selectedColor = res.image[0].phoneColor;
      this.selectedMemory = res.memory[0].size;
      this.selectedPrice = res.memory[0].price;
    });
  }

  sideImage(images) {
    this.img = images;
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
