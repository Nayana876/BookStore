import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByDisplayComponent } from './filter-by-display.component';

describe('FilterByDisplayComponent', () => {
  let component: FilterByDisplayComponent;
  let fixture: ComponentFixture<FilterByDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
