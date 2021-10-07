import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheBenevoleComponent } from './affiche-benevole.component';

describe('AfficheBenevoleComponent', () => {
  let component: AfficheBenevoleComponent;
  let fixture: ComponentFixture<AfficheBenevoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheBenevoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheBenevoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
