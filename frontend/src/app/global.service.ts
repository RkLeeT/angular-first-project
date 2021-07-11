import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  auth = new Subject<boolean>();

  constructor() { }

  checkAuth(value: boolean) {
    this.auth.next(value);
  }
}
