import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbookusingIsbnComponent } from './addbookusing-isbn.component';

describe('AddbookusingIsbnComponent', () => {
  let component: AddbookusingIsbnComponent;
  let fixture: ComponentFixture<AddbookusingIsbnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbookusingIsbnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbookusingIsbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
