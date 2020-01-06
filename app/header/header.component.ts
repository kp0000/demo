import { Component, OnInit } from '@angular/core';
import { MySharedService } from '../my-shared.service';
// import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser;
  constructor(private _mySharedService : MySharedService, private router: Router) { }

  ngOnInit() {
    this._mySharedService.currentData.subscribe(data => {
      if(data != ''){
        this.loggedInUser = data;
        console.log(this.loggedInUser);
      }
      else
         this.router.navigate(['/login']);
    })
  }

}
