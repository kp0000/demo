import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { MySharedService } from '../my-shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _userService: UserService, 
    private _router: Router, 
    private _mySharedService: MySharedService) { }
  loginDetails={};
  signupDetails = {};
  showSignUp = true;
  showLogin = false;
  showLoginError = true;
 
  onSubmit(){
    this._userService.searchUser(this.loginDetails).subscribe(data=>{
      if(data){
    this.showLoginError = true;
    this._mySharedService.updateData(data);
    this._router.navigate(['/home']);
      }
      else
      this.showLoginError = false;
  })
}
  login(){
    //alert(JSON.stringify(this.signupDetails));
    this._userService.createUser(this.signupDetails).subscribe(response=>{
      console.log(response);

    });
    alert("Sign-up successfull!");
  }
  showLoginForm(){
    this.showLogin = false;
    this.showSignUp = true;
  }
  showSignUpForm(){
    this.showLogin = true;
    this.showSignUp = false;
  }

  ngOnInit() {
  }

}
