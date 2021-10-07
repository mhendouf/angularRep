import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActiComponent } from './add-acti.component';

describe('AddActiComponent', () => {
  let component: AddActiComponent;
  let fixture: ComponentFixture<AddActiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
