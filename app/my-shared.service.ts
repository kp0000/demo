import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MySharedService {

  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();
  constructor() { }
  updateData(item:any){
    this.data.next(item);
  }
}
