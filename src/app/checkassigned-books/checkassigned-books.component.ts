import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { map } from 'rxjs/operators';
import { CheckAssignedBookService } from './check-assigned-book.service';
import { AssignBookShowDetails, AssignBookDetails } from '../models/assignedBookDetails';
import { Book } from '../models/bookDetails';

@Component({
  selector: 'app-checkassigned-books',
  templateUrl: './checkassigned-books.component.html',
  styleUrls: ['./checkassigned-books.component.css']
})
export class CheckassignedBooksComponent implements OnInit {

  checkAssignedUserForm: FormGroup;
  userlist: any[] = [];
  assignedBookData: AssignBookDetails[] = [];
  bookCollectionData: any[] = [];
  bookUser: string;
  libraryBooks: Book[] = [];
  showdata: AssignBookShowDetails[] = [];
  showSpinner = true;

  
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private bookService: BookService,
    private userService: UserService,
    private assignedBookService: CheckAssignedBookService
  ) { }

  ngOnInit() {
   this.getAllBookDetails();
    this.getAllUserDetails();
    // console.log(this.userService.getAllUserDetails());
    this.checkAssignedUserForm = this.formBuilder.group({
      user: new FormControl('', Validators.required),
    });

  }

  getAllBookDetails() {
    // Use snapshotChanges().map() to store the key
    this.bookService.getAllBookDetails().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(libraryBooks => {
      this.libraryBooks = libraryBooks;
      // console.log( this.libraryBooks);
      // this.showSpinner = false;
      // console.log(libraryBooks.length);
    });
  }

  selectUsertoDisplayList(param1) {
    this.bookUser = param1;
    this.getAllAssignedBooksForThisUser();
  }

  getAllUserDetails() {
    this.userService.getAllUserDetails().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      // console.log(data);
      this.userlist = data.filter(x => x.userType !== 'Admin');
      this.showSpinner = false;
      // console.log(this.userlist);
    });
  }

  getAllAssignedBooksForThisUser() {
    this.showSpinner = true;
    this.showdata = [];
    this.assignedBookService.getAllAssignedBooksForThisUser().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.assignedBookData = data.filter(x => x.userName === this.bookUser);
      // console.log(this.assignedBookData);
      this.assignedBookData.forEach(element => {
        const ad = new AssignBookShowDetails();
        ad.userName = element.userName;
        ad.issueDate = element.issueDate;
        ad.rating = element.rating;
        ad.returnDate = element.returnDate;
        ad.review = element.review;
        const bookdata = this.libraryBooks.find(x => x.id === element.bookID);
        if (bookdata) {
          ad.title = bookdata.title;
          ad.author = bookdata.author;
          ad.image = bookdata.imageURL;
        }
        this.showdata.push(ad);
        
      });
      this.showSpinner = false;
    });
    
  }



}

