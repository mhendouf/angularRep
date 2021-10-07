import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiComponent } from './list-acti.component';

describe('ListActiComponent', () => {
  let component: ListActiComponent;
  let fixture: ComponentFixture<ListActiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
