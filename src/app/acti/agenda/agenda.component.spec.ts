import { TestBed, async } from '@angular/core/testing';
import { AgendaComponent } from './agenda.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AgendaComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AgendaComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'localize-schedule'`, () => {
    const fixture = TestBed.createComponent(AgendaComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('localize-schedule');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AgendaComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to localize-schedule!');
  });
});