import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { UserDetails } from '../models/userDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userdetails = UserDetails;
  LibraryUserDetails: any[] = []; // any[] means any type of object

  constructor(
    private userservice: UserService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getAllUserDetails();
  }

  getAllUserDetails() {
    this.userservice.getAllUserDetails().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
       this.LibraryUserDetails = data;
       this.userdetails = this.LibraryUserDetails.find(x => x.key === localStorage.getItem('User'));
    });
  }

  logOut() {
    localStorage.clear();
    this.userservice.loginStatus = false;
    this.userservice.IsAdmin = false;
    this.route.navigate(['/login']);
  }

}


