import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CartService} from '../../_services/cart.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  count: number = null;

  constructor(private fb: FormBuilder,
              private cartService: CartService) {
    this.productForm = this.fb.group({
      name: new FormControl(''),
      price: new FormControl(''),
      color: new FormControl(''),
      memorySize: new FormControl(''),
      display: new FormControl(''),
      waterResistant: new FormControl(''),
      camera: new FormControl(''),
      frontCamera: new FormControl(''),
      futures: new FormControl(''),
      processor: new FormControl(''),
      charging: new FormControl(''),
      memoryData: this.fb.array([]),
      colors: new FormGroup({
        color: new FormControl(''),
        phoneColor: new FormControl(''),
        // path: new FormGroup({
        //   img: new FormControl('')
        // }),
      }),
      imagePath: this.fb.array([])
    });
  }

  ngOnInit(): void {
  }

  onCreate(data) {
    console.log(this.productForm.value);
    this.cartService.createProduct(data).subscribe(() => {
    });
  }

  memories(): FormArray {
    return this.productForm.get('memoryData') as FormArray;
  }

  createMemory(): FormGroup {
    return this.fb.group({
      size: '',
      price: ''
    });
  }

  addMemory(): void {
    this.memories().push(this.createMemory());
    this.count++;
  }

  removeMemory(i: number) {
    this.memories().removeAt(i);
  }

  pathImages(): FormArray {
    return this.productForm.get('imagePath') as FormArray;
  }

  addImage(event): void {
    this.pathImages().push(this.uploadImage());
    console.log('is it uploaded', event);
  }

  uploadImage(): FormGroup {
    return this.fb.group({
      img: ''
    });
  }

  // uploadFile(event) {
  //   console.log('uploaded file', event);
  // }

}
