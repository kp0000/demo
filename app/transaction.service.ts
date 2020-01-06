import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MyTransaction} from './MyTransaction';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  _url = "https://localhost:44366/api/TransactionDetails";

  constructor(private http: HttpClient) { }

  createTransaction(model){
    return this.http.post(this._url,model);
  }
  myTransaction(id): Observable<MyTransaction[]>{
    return this.http.get<MyTransaction[]>(this._url+'/UserHistory?id='+id);
}
}
