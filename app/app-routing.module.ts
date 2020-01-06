import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DoTransactionComponent } from './do-transaction/do-transaction.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { LoginComponent } from './login/login.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path:'',redirectTo: '/login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'header', component:HeaderComponent},
  {path:'do-transaction', component:DoTransactionComponent},
  {path:'transaction-history', component:TransactionHistoryComponent},
  {path:'addMoney', component:AddMoneyComponent},
  {path: 'profile', component:ProfileComponent},
  {path:'footer', component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
