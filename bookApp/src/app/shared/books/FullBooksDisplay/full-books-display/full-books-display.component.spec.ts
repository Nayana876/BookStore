import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBooksDisplayComponent } from './full-books-display.component';

describe('FullBooksDisplayComponent', () => {
  let component: FullBooksDisplayComponent;
  let fixture: ComponentFixture<FullBooksDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullBooksDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBooksDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
