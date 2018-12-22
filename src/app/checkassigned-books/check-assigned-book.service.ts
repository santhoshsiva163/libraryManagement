import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Book } from '../models/bookDetails';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetails } from '../models/userDetails';
import { HttpClient } from '@angular/common/http';
import { AssignBookDetails } from '../models/assignedBookDetails';

@Injectable({
  providedIn: 'root'
})
export class CheckAssignedBookService {


  private dbPathAssignedBookforUser = 'AssignBooksToUser';

  assignedBookRef: AngularFireList<any> = null;

  loginStatus = false;
  bookUserDetails: AssignBookDetails[] = [];
  userdetails: any ;


  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {
    this.assignedBookRef = db.list(this.dbPathAssignedBookforUser);
    if (localStorage.getItem('User') !== null) {
      this.loginStatus = true;
    }
  }

  createAssignBookDetail(assignedBook: AssignBookDetails): void {
    console.log(assignedBook);
    const assignBookModel = {
      bookID: assignedBook.bookID,
      userName: assignedBook.userName,
      rating: assignedBook.rating,
      review: assignedBook.review,
      issueDate: assignedBook.issueDate,
      returnDate: assignedBook.returnDate
    };
    this.assignedBookRef.push(assignBookModel);
  }

  editAssignBookDetail(key: string, value: any): void {
    console.log(key, value);
    this.assignedBookRef.update(key, value).catch(error => { console.log(error); this.handleError(error); });
  }

  getAllAssignedBooksForThisUser(): AngularFireList<AssignBookDetails> {
    return this.assignedBookRef;
  }

  deleteAssignBookDetail(id: any): void {
    this.assignedBookRef.remove(id).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }


}
