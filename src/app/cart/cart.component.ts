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
  checkoutForm;
  total: number;
  submitted = false;

  constructor(private cartService: CartService,
              private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
      })
    });
  }

  ngOnInit(): void {
    this.getProductPrice();
  }

  getProductPrice() {
    this.products = this.cartService.getProducts();
    // take the price from obj and calculate it
    this.total = this.products.map(key => {
      return key.price;
    }).reduce((a, b) => a + b, 0);
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
    this.products = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
}
