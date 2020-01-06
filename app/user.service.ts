import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from './Iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  _url = "https://localhost:44366/api/UserDetails";
  
  getUser(): Observable<IUser[]>{
      return this.http.get<IUser[]>(this._url);
  }
  searchUser(model): Observable<IUser>{
      var filter = this._url + '/SearchUser?email=' + model.useremail + '&password=' +model.password;               //model.(name)__name as given in ngModel
      return this.http.get<IUser>(filter);
  }
  createUser(model){
   return this.http.post(this._url,model);
  }
  getUserList(id): Observable<IUser[]>{
    return this.http.get<IUser[]>(this._url+'/GetUserList?id='+id);
  }
  updateMoney(money){
    return this.http.put(this._url+'/'+money.userId,money);
  }
}
