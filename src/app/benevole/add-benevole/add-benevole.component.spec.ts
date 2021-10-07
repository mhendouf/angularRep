import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenevoleComponent } from './add-benevole.component';

describe('AddBenevoleComponent', () => {
  let component: AddBenevoleComponent;
  let fixture: ComponentFixture<AddBenevoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBenevoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBenevoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
