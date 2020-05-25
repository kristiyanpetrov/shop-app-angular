import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // color: string;

  private data = new Subject<any>();
  public data$ = this.data.asObservable();

  constructor() {
  }

  newBackgroundColor(x: any) {
    this.data.next(x);
  }

}
