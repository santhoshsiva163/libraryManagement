import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/bookDetails';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private isbnAPIUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

  private dbPath = 'bookDetails';

  booksRef: AngularFireList<any> = null;

  loginStatus = false;
  bookdata = new BehaviorSubject<Book>(null);
  clickedBookObj = new BehaviorSubject<any>(null);
  overallBookCount = new BehaviorSubject<number>(null);
  isedit = false;

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {
    this.booksRef = db.list(this.dbPath);
    if (localStorage.getItem('User') !== null) {
      this.loginStatus = true;
    }
  }

  createBookDetail(bookdetails: Book): void {
    console.log(bookdetails);
    const book = {
      title: bookdetails.title,
      id: bookdetails.id,
      author: bookdetails.author,
      category: bookdetails.category === undefined ? 'NA' : bookdetails.category,
      imageURL: bookdetails.imageURL,
      isbnBook: bookdetails.isbnBook,
      desc: bookdetails.desc === undefined ? 'NA' : bookdetails.desc,
      stock: bookdetails.stock,
      availableDays: bookdetails.availableDays,
      location: bookdetails.location
    };
    this.booksRef.push(book);
  }

  editBookDetail(key: string, value: any): void {
    console.log(key, value);
    this.booksRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteBookDetail(key: string): void {
    this.booksRef.remove(key).catch(error => this.handleError(error));
  }

  getAllBookDetails(): AngularFireList<Book> {
    return this.booksRef;
  }

  getISBNBookDetails(isbn: any): Observable<any> {
    return this.http.get(this.isbnAPIUrl + isbn);
  }

  private handleError(error) {
    console.log(error);
  }


}
