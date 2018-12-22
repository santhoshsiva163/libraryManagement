import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddbooksComponent } from './book/addbooks/addbooks.component';
import { AddbookusingIsbnComponent } from './book/addbookusing-isbn/addbookusing-isbn.component';
import { CheckassignedBooksComponent } from './checkassigned-books/checkassigned-books.component';
import { ViewDetailsComponent } from './book/view-details/view-details.component';
import { UserService } from './user/user.service';
import { BookService } from './book/book.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    UserComponent,
    LoginComponent,
    WelcomeComponent,
    AddbooksComponent,
    AddbookusingIsbnComponent,
    CheckassignedBooksComponent,
    ViewDetailsComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // for database
    // HttpModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [UserService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
