import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from '../models/userDetails';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private dbPathUser = 'UserDetails';

  userRef: AngularFireList<any> = null;

  loginStatus = false;
  userDetailData = new BehaviorSubject<UserDetails>(null);
  userdetails: any;
  IsAdmin = false;

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {
    this.userRef = db.list(this.dbPathUser);
    if (localStorage.getItem('User') !== null) {
      this.loginStatus = true;
    }
    if (localStorage.getItem('UserType') === 'Admin') {
      this.IsAdmin = true;
    } else {
      this.IsAdmin = false;
    }
    console.log(this.IsAdmin);
  }

  createUserDetail(user: UserDetails): void {
    console.log(user);
    const userModel = {
      addUserName: user.addUserName,
      addPassword: user.addPassword,
      userType: user.userType,
      userImage: user.userImage,
      userBookLimit: user.userBookLimit,
    };
    this.userRef.push(userModel);
  }


  getAllUserDetails(): AngularFireList<UserDetails> {
    return this.userRef;
  }
  

  private handleError(error) {
    console.log(error);
  }

}


