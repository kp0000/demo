import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MySharedService } from '../my-shared.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-do-transaction',
  templateUrl: './do-transaction.component.html',
  styleUrls: ['./do-transaction.component.css']
})
export class DoTransactionComponent implements OnInit {
  loggedInUser:any ={} ;
  userArray = [];
  transferData:any ={};
  hideSuccess:boolean = true;
  hideFail:boolean = true;

  constructor(
    private _userService: UserService, 
    private __sharedService: MySharedService, 
    private _transaction: TransactionService) { }

  ngOnInit() {
    this.__sharedService.currentData.subscribe(data => {
      this.loggedInUser = data;})

    this._userService.getUserList(this.loggedInUser.userId).subscribe(data => {
      this.userArray = data;
    })
  }

  transferAmount(){
    
    // put call for loggedin user --start
    var  debitUserInitialAmount;
    debitUserInitialAmount = this.loggedInUser.amount;
    this.loggedInUser.amount = this.loggedInUser.amount - this.transferData.amount;
    this._userService.updateMoney(this.loggedInUser).subscribe(data => {
      // alert("Debit user update call succeded");
      
      // put call for refUser --start
      var creditUserInitialAmount;
      creditUserInitialAmount = this.transferData.refUser.amount;
      this.transferData.refUser.amount = this.transferData.refUser.amount + this.transferData.amount;
      this._userService.updateMoney(this.transferData.refUser).subscribe(data => {
        // alert("Credit user update call succeded");

        // post call for loggedin user --start
        var debitUserObj :any = {};
        debitUserObj.userId = this.loggedInUser.userId;
        debitUserObj.refId = this.transferData.refUser.userId;
        debitUserObj.transactionAmount = this.transferData.amount;
        debitUserObj.initialAmount = debitUserInitialAmount;
        debitUserObj.date = new Date();
        debitUserObj.transactionType = "Debit";

        this._transaction.createTransaction(debitUserObj).subscribe(data => {
          // alert("Debit transaction call success");

          // post call for refUser --start
          var creditUserObj :any ={};
          creditUserObj.userId = this.transferData.refUser.userId;
          creditUserObj.refId = this.loggedInUser.userId;
          creditUserObj.transactionAmount = this.transferData.amount;
          creditUserObj.initialAmount = creditUserInitialAmount;
          creditUserObj.date = new Date();
          creditUserObj.transactionType = "Credit";

          this._transaction.createTransaction(creditUserObj).subscribe(data => {
            // alert("Credit transaction call success");
            this.hideSuccess = false;
          },
          error => {
            alert("Credit transaction call failed");
            this.hideFail = false;
          });
          // post call for refUser --end
        },
        error => {
          alert("Debit transaction call failed");
          this.hideFail = false;
        });
        // post call for loggedin user --end
        },
        error => {
          alert("Credit user update call failed");
          this.hideFail = false;
        });
        // put call for refUser --end
    },
    error => {
      alert("Debit user update call failed");
      this.hideFail = false;
    });

    // put call for loggedin user --end

  }

}
