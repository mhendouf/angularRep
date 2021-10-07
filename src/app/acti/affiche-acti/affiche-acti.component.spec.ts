import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheActiComponent } from './affiche-acti.component';

describe('AfficheActiComponent', () => {
  let component: AfficheActiComponent;
  let fixture: ComponentFixture<AfficheActiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheActiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheActiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
