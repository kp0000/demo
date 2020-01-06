import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MySharedService } from '../my-shared.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {
  loggedInUser:any = {};
  showError:boolean = true;
  showSuccess:boolean = true;
  message:string;

  constructor(private _userService: UserService, private _mySharedService: MySharedService) { }
  amount;
  
  ngOnInit() {
    this._mySharedService.currentData.subscribe(data => {
      this.loggedInUser=data;
    })
  }
  addMoney(){
    if(this.amount){
    this.loggedInUser.amount = this.amount+this.loggedInUser.amount;
    // alert(JSON.stringify(this.loggedInUser));
    this._userService.updateMoney(this.loggedInUser).subscribe(data => {
      console.log(data);
      this.showSuccess=false;
      this.showError = true;
    },
    error=>{
       this.showError=false;
       this.showSuccess = true;
       this.message="Failed to add money!";
    })
  }
  else
  {
    this.showError = false;
    this.showSuccess = true;
    this.message= "Please fill amount";
  }

}}
