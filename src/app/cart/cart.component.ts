import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products = [];
  checkoutForm: FormGroup;
  totalPhonePrice: number = 0;
  submitted: boolean = false;
  shippingPrices = {};
  selectedDelivery: any;
  selectedShipPrice = false;
  totalPrice: number;

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
    this.products = this.cartService.getProducts();
    // take the price from obj and calculate it
    this.totalPhonePrice = this.products.map(key => {
      return key.price;
    }).reduce((a, b) => a + b, 0);
  }

  getShippingDetails() {
    this.cartService.getShippingDetails().subscribe((obj) => {
      // console.log('ship data is here', obj);
      this.shippingPrices = obj;
    });
  }

  selectedDeliveryPrice() {
    this.selectedShipPrice = true;
    this.calcShipPrice();
  }

  calcShipPrice() {
    this.totalPrice = this.totalPhonePrice + this.selectedDelivery.price;
    this.checkoutForm.patchValue({
      product: this.products,
      delivery: this.selectedDelivery,
      total: this.totalPrice
    });
    console.log('check total price', this.totalPrice);
    // remove two properties from the obj and submit just name and price of product
    this.products.map(res => delete res.image && delete res.description);
    console.log(this.products);
  }

  onSubmit(customerData) {
    this.submitted = true;
    // stop if form is invalid or show alert Success
    if (this.checkoutForm.invalid) {
      alert('Please fill out correct all fields!');
      return;
    } else {
      alert('Your order has been submitted!');
      console.warn('Your order has been submitted', customerData);
    }
    // send submitted data to localStorage
    localStorage.setItem('dataStorage', JSON.stringify(customerData));

    // reset the form and the cart price when submitted
    this.products = this.cartService.clearCart();
    this.checkoutForm.reset();
    this.totalPrice = 0;
  }

  getLocalStorageData(): void {
    // getting data from localStorage
    const myItem = localStorage.getItem('dataStorage');
    // console.log('getLocalStorageData', myItem);
  }
}
