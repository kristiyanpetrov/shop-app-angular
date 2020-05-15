import {Component, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {ActivatedRoute} from '@angular/router';
import {products} from '../mock-data/products';
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
    Swal.fire({
      title: 'Add to cart?',
      text: product.name,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((item) => {
      if (item.value) {
        this.cartService.addToCart(product);
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

  // opensweetalert() {
  //   Swal.fire({
  //     text: 'Hello!',
  //     icon: 'success'
  //   });
  // }

  opensweetalertdng() {
    Swal.fire('Oops...', 'Something went wrong!', 'error');
  }

  opensweetalertcst() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
}
