import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddbooksComponent } from './book/addbooks/addbooks.component';
import { AddbookusingIsbnComponent } from './book/addbookusing-isbn/addbookusing-isbn.component';
import { CheckassignedBooksComponent } from './checkassigned-books/checkassigned-books.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'AddBook', component: AddbooksComponent },
  { path: 'AddBookISBN', component: AddbookusingIsbnComponent },
  { path: 'CheckAssignedBooks', component: CheckassignedBooksComponent },
  { path: 'AddUser', component: UserComponent },
  { path: 'WelcomeUser', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
