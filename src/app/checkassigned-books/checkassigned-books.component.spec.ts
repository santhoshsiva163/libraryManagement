import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckassignedBooksComponent } from './checkassigned-books.component';

describe('CheckassignedBooksComponent', () => {
  let component: CheckassignedBooksComponent;
  let fixture: ComponentFixture<CheckassignedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckassignedBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckassignedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
