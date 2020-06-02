import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {CartService} from '../../_services/cart.service';
import {ActivatedRoute} from '@angular/router';
import {products} from '../../_mock-data/products';
import {ColorService} from '../../_services/color.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, AfterViewChecked {
  product: any;
  selectedMemory = [];
  img: string;
  selectedColor: string;
  selectedPrice: number;
  sideImages = [];
  id: number = null;
  editProduct: FormGroup;
  data = [
    {
      color: 'black'
    },
    {
      color: 'yellow'
    },
    {
      color: 'red'
    }
  ];

  constructor(private cartService: CartService,
              private route: ActivatedRoute,
              private colorService: ColorService,
              private fb: FormBuilder) {
    this.editProduct = this.fb.group({
      name: '',
      price: '',
      color: '',
      memorySize: '',
      display: '',
      waterResistant: '',
      camera: '',
      frontCamera: '',
      futures: '',
      processor: '',
      charging: '',
      memory: this.fb.group([
        {
          size: '',
          price: ''
        },
        {
          size: '',
          price: ''
        },
        {
          size: '',
          price: ''
        }
      ]),
      image: [
        {
          color: 'silver',
          phoneColor: 'Silver',
          path: [
            {
              img: '../assets/img/11pro/silver/silver.jpg'
            },
            {
              img: '../assets/img/11pro/silver/silver1.jpg'
            },
            {
              img: '../assets/img/11pro/silver/silver2.jpg'
            },
            {
              img: '../assets/img/11pro/silver/silver3.jpg'
            },
            {
              img: '../assets/img/11pro/silver/silver4.jpg'
            },
            {
              img: '../assets/img/11pro/silver/all.jpg'
            }
          ],
        },
        {
          color: 'darkslategrey',
          phoneColor: 'Space Grey',
          path: [
            {
              img: '../assets/img/11pro/space-grey/0.jpg'
            },
            {
              img: '../assets/img/11pro/space-grey/1.jpg'
            },
            {
              img: '../assets/img/11pro/space-grey/2.jpg'
            },
            {
              img: '../assets/img/11pro/space-grey/3.jpg'
            },
            {
              img: '../assets/img/11pro/space-grey/4.jpg'
            },
            {
              img: '../assets/img/11pro/space-grey/all.jpg'
            }
          ],
        },
        {
          color: 'grey',
          phoneColor: 'Midnight Green',
          path: [
            {
              img: '../assets/img/11pro/midnight/0.jpg'
            },
            {
              img: '../assets/img/11pro/midnight/1.jpg'
            },
            {
              img: '../assets/img/11pro/midnight/2.jpg'
            },
            {
              img: '../assets/img/11pro/midnight/3.jpg'
            },
            {
              img: '../assets/img/11pro/midnight/4.jpg'
            },
            {
              img: '../assets/img/11pro/midnight/all.jpg'
            }
          ],
        },
        {
          color: 'palegoldenrod',
          phoneColor: 'Gold',
          path: [
            {
              img: '../assets/img/11pro/gold/0.jpg'
            },
            {
              img: '../assets/img/11pro/gold/1.jpg'
            },
            {
              img: '../assets/img/11pro/gold/2.jpg'
            },
            {
              img: '../assets/img/11pro/gold/3.jpg'
            },
            {
              img: '../assets/img/11pro/gold/4.jpg'
            },
            {
              img: '../assets/img/11pro/gold/all.jpg'
            }
          ],
        }
      ]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProduct();
  }

  ngAfterViewChecked() {
    // this.editProduct.controls['name'].setValue(this.product.name);
    // this.editProduct.controls['price'].setValue(this.selectedPrice);
  }

  getProduct() {
    this.cartService.getProduct(this.id).subscribe((data: any) => {
      this.product = data;
      // assign first property from obj arr in var when load page
      this.img = data.image[0].path[0].img;
      this.sideImages = data.image[0].path;
      this.selectedColor = data.image[0].phoneColor;
      this.selectedMemory = data.memory[0].size;
      this.selectedPrice = data.memory[0].price;
    });
  }

  postJson(data) {
    const id = this.id;
    console.log('before post', data, id);
    this.cartService.updateProduct(data, id).subscribe(() => {
    });
  }

  changeNavBackground(color) {
    this.colorService.newBackgroundColor(color);
    console.log('check color', color);
  }

  sideImage(images) {
    this.img = images;
  }

  selectedPhoneColor(data) {
    this.img = data.path[0].img;
    this.selectedColor = data.phoneColor;
    this.sideImages = data.path;
  }

  selectPhoneMemory(data) {
    this.selectedMemory = data.size;
    // we change price when memory size is changed
    this.selectedPrice = data.price;
  }

}
