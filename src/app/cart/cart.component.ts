import {Component, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products;
  checkoutForm: FormGroup;
  totalPhonePrice: number = 0;
  submitted: boolean = false;
  shippingPrices: any;
  selectedDelivery: any;
  selectedShipPrice = false;
  totalPrice: number;
  filteredProduct = [];

  constructor(private cartService: CartService,
              private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: this.formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        county: ['', Validators.required],
        postCode: ['', Validators.required],
      }),
      paymentDetails: this.formBuilder.group({
        name: ['', Validators.required],
        cardNumber: ['', Validators.required],
        validFrom: ['', Validators.required],
        expiresEnd: ['', Validators.required],
        cvv: ['', Validators.required],
      }),
      product: [''],
      delivery: [''],
      total: ['']
    });
  }

  ngOnInit(): void {
    this.getProductPrice();
    this.getShippingDetails();
    this.getLocalStorageData();
  }

  getProductPrice() {
    this.products = this.cartService.products;
    // take the price from obj and calculate total price of devices
    this.totalPhonePrice = this.products.map(key => {
      return key.price;
    }).reduce((a, b) => a + b, 0);
  }

  getShippingDetails() {
    this.cartService.getShippingDetails().subscribe((obj) => {
      this.shippingPrices = obj;
    });
  }

  selectedDeliveryPrice() {
    this.selectedShipPrice = true;
    this.calcShipPrice();
  }

  calcShipPrice() {
    this.totalPrice = this.totalPhonePrice + this.selectedDelivery.price;
    // assign name,price,memory,color of obj to filteredProduct
    this.filteredProduct = this.products.map(({name, price, color, memorySize}) =>
      ({name, price, color, memorySize}));
    this.checkoutForm.patchValue({
      product: this.filteredProduct,
      delivery: this.selectedDelivery,
      total: this.totalPrice
    });
    console.log('check total price', this.totalPrice);
  }

  onSubmit(customerData) {
    Swal.fire({
      title: 'Are you sure you want to finish the order?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((item) => {
      if (item.value) {
        this.submitted = true;
        // reset form and cart when submitted
        this.products = this.cartService.clearCart();
        this.checkoutForm.reset();
        this.totalPrice = 0;
        Swal.fire(
          'Payment successful!',
          '',
          'success'
        );
      } else if (item.dismiss) {
      }
    });
    console.warn('Your order has been submitted', customerData);
    // send submitted data to localStorage
    localStorage.setItem('dataStorage', JSON.stringify(customerData));
  }

  removeItem(product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    this.getProductPrice();
    this.selectedShipPrice = false;
    console.log(product.name, 'was removed from cart');
  }

  getLocalStorageData(): void {
    // getting data from localStorage
    const myItem = localStorage.getItem('dataStorage');
    // console.log('getLocalStorageData', myItem);
  }
}
