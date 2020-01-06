import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  userList;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUser().subscribe(data=>{
      this.userList = data;
    })
    
  }

}
