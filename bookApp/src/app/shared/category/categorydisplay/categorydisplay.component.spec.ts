import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorydisplayComponent } from './categorydisplay.component';

describe('CategorydisplayComponent', () => {
  let component: CategorydisplayComponent;
  let fixture: ComponentFixture<CategorydisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorydisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorydisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
