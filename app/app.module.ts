import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from  '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// no need to import header & footer component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './user.service';
import {HttpClientModule} from '@angular/common/http';
import { DoTransactionComponent } from './do-transaction/do-transaction.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { MySharedService } from './my-shared.service';
import { TransactionService } from './transaction.service';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    DoTransactionComponent,
    TransactionHistoryComponent,
    AddMoneyComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService,MySharedService,TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
