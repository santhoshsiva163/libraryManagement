import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BookService } from '../book/book.service';
import { CheckAssignedBookService } from '../checkassigned-books/check-assigned-book.service';
import { UserDetails } from '../models/userDetails';
import { AssignBookDetails } from '../models/assignedBookDetails';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showSpinner = true;
  detailClicked = false;
  checkUserType: any;

  constructor(
    private bookService: BookService,
    private assignedBookService: CheckAssignedBookService,
    private userservice: UserService,
    private route: Router
  ) { }

  userdetails: UserDetails;
  searchData = '';
  libraryBooks: any;
  assignBooktoCurrentUser = false;
  overallBookCount: number;
  LibraryUserDetails: any[] = [];
  bookUserDetails: AssignBookDetails[] = [];
  getCurrentDate = new Date();


  ngOnInit() {
    this.getAllBookUser();
    this.bookService.overallBookCount.subscribe((result) => { this.overallBookCount = result; });
    // this.items.subscribe(() => this.showSpinner = false)
    // console.log(this.showSpinner);
  }

  checkstatus(bookdata) {
    const record = this.assignedBookService.bookUserDetails.filter(x => x.userName === this.userdetails.addUserName
      && x.bookID === bookdata.id && x.returnDate === '');
    if (record.length > 0) {
      return true;
    } else {
      return false;
    }

  }
  
  assign(bookDetails) {
    // console.log('sub');
    if (confirm('Are you sure do you want to Assign this book?')) {
			const clickedBookid = bookDetails.id;
      const currentUsername = this.userdetails.addUserName === undefined ? '' : this.userdetails.addUserName;
      // const currentDate = new Date();
      // const returnDate = null;
      // const reviewComments = '';
      // const givenRating = 0;
      // const assignBooks = {
      //   key: null,
      //   bookID: clickedBookid,
      //   userName: currentUsername,
      //   issueDate: new Date().getDate(),
      //   review: reviewComments,
      //   rating: givenRating,
      //   returnDate: returnDate
      // };
      const assignBooks = new AssignBookDetails();
      assignBooks.key = null;
      assignBooks.bookID = clickedBookid;
      assignBooks.userName = currentUsername;
      assignBooks.issueDate = new Date().toString();
      assignBooks.review = '-';
      assignBooks.rating = 0;
      assignBooks.returnDate = '';

      this.assignedBookService.createAssignBookDetail(assignBooks);
		}

  }

  unassign(bookDetails) {
    if (confirm('Are you sure do you want to Un Assign?')) {
			// console.log(bookDetails);
      // const clickedBookId = bookDetails.id;
      const record = this.assignedBookService.bookUserDetails.filter(x => x.userName === this.userdetails.addUserName
        && x.bookID === bookDetails.id && x.returnDate === '');
      if (record.length > 0) {
        const assignBooks = new AssignBookDetails();
        assignBooks.key = record[0].key;
        assignBooks.bookID = record[0].bookID;
        assignBooks.userName = record[0].userName;
        assignBooks.issueDate = record[0].issueDate;
        assignBooks.review = 'Done';
        assignBooks.rating = 4;
        assignBooks.returnDate = new Date().toString();
        this.assignedBookService.editAssignBookDetail(assignBooks.key, assignBooks);
      }
		}
    


  }

  getAllBookDetails() {
    // Use snapshotChanges().map() to store the key
    this.bookService.getAllBookDetails().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(libraryBooks => {
      this.libraryBooks = libraryBooks;
      const overallBookCount = libraryBooks.length;
      this.bookService.overallBookCount.next(overallBookCount);
      // this.showSpinner = false;
      // console.log(libraryBooks.length);
    });
  }

  tileDetailedView(bookDetails) {
    console.log(bookDetails);
    this.detailClicked = true;
    this.bookService.bookdata.next(bookDetails);
  }

  searchFilterFN(bookDetails) {
    if (bookDetails) {
      const test = bookDetails.title.toLowerCase().indexOf(this.searchData.toLowerCase()) !== -1 ;
      if (test) {
        return test;
      }
     const auth = bookDetails.author.toLowerCase().indexOf(this.searchData.toLowerCase()) !== -1 ;
      if (auth) {
        return auth;
      }
      return null;
    }
    return false;
  }



  getAllUserDetails() {
    this.userservice.getAllUserDetails().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.LibraryUserDetails = data;

      this.userdetails = this.LibraryUserDetails.find(x => x.key === localStorage.getItem('User'));
      this.getAllBookDetails();
      // this.showSpinner = false;
    });
  }

  getAllBookUser() {
    this.assignedBookService.getAllAssignedBooksForThisUser().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.assignedBookService.bookUserDetails = data;
      this.getAllUserDetails();
      // console.log(this.assignedBookService.bookUserDetails);
      this.showSpinner = false;
      // console.log(this.showSpinner = true);
    },
    () => {
     // this.showSpinner = true;
    }
    );
  }


  addnewBook() {
    this.bookService.isedit = false;
    this.route.navigate(['/AddBook']);
  }

}
