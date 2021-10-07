import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBenevoleComponent } from './list-benevole.component';

describe('ListBenevoleComponent', () => {
  let component: ListBenevoleComponent;
  let fixture: ComponentFixture<ListBenevoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBenevoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBenevoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
