import { Component, OnInit } from '@angular/core';
import { MySharedService } from '../my-shared.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  user:any = {};
  myTrans:any = [];
  constructor(private _transaction: TransactionService, private _mySharedService: MySharedService) { }

  ngOnInit() {
    this._mySharedService.currentData.subscribe(data=>{
      this.user = data;
    })
    this._transaction.myTransaction(this.user.userId).subscribe(data=>{
      this.myTrans = data;
    })
  }

}
