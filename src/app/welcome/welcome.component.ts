import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDetails } from '../models/userDetails';
import { map } from 'rxjs/operators';
import { CheckAssignedBookService } from '../checkassigned-books/check-assigned-book.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  LibraryUserDetails: any[] = [];
  userdetails = UserDetails;
  displayUsername: string;
  displayUserType: string;
  userList: any;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private assignedBookService: CheckAssignedBookService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('welcome');
    this.getAllUserDetails();
    this.getAllAssignedBooksForThisUser();
    this.getAllBookUser();
  }

  getAllUserDetails() {
    this.userService.getAllUserDetails().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.LibraryUserDetails = data;
      this.userdetails = this.LibraryUserDetails.find(x => x.key === localStorage.getItem('User'));
      this.userService.userdetails = this.userdetails;
      console.log(this.userService.userdetails);
      this.displayUsername = this.userService.userdetails.addUserName;
      this.displayUserType = this.userService.userdetails.userType;
      // this.displayUsername = this.userdetails.addUserName === undefined ? '' : this.userdetails.addUserName;
    });
  }

  getAllAssignedBooksForThisUser() {
    this.assignedBookService.getAllAssignedBooksForThisUser().snapshotChanges().pipe(
      map(data => data.map(c => ({ key: c.payload.key, ...c.payload.val() })) )
    )
    .subscribe(
      userList => {
        this.userList = userList;
        // console.log(this.userList);
      }
    );
  }

  getAllBookUser() {
    this.assignedBookService.getAllAssignedBooksForThisUser().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.assignedBookService.bookUserDetails = data;
      // console.log(this.assignedBookService.bookUserDetails);
    });
  }



}
