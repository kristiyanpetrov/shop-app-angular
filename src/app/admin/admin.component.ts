import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userName: string;
  password: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.userName === 'admin' && this.password === 'admin') {
      this.router.navigate(['admin/products']);
    } else {
      return window.alert('Wrong user name or password!');
    }
  }

}
