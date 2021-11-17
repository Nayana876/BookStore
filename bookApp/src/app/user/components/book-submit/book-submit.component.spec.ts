import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSubmitComponent } from './book-submit.component';

describe('BookSubmitComponent', () => {
  let component: BookSubmitComponent;
  let fixture: ComponentFixture<BookSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
