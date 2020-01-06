import { Component, OnInit } from '@angular/core';
import { MySharedService } from '../my-shared.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedInUser:any = {};
  editData:any ={};
  hideSuccess = true;
  hideError = true;

  constructor(private _mySharedService: MySharedService, private _userService: UserService) { }

  ngOnInit() {
    this._mySharedService.currentData.subscribe(data => {
      this.editData = data;
      this.loggedInUser = this.editData;
    })
  }

  edit(){
    this._userService.updateMoney(this.editData).subscribe(data => {
      this.hideSuccess = false;
      this.hideError = true;
    },
    error => {
      this.hideSuccess = true;
      this.hideError = false;
    })
  }

}
