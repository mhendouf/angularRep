import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AddActiComponent } from './acti/add-acti/add-acti.component';
import { ListActiComponent } from './acti/list-acti/list-acti.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {
  MatCheckboxDefaultOptions,
  MatCheckboxModule,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/checkbox';
import { AddBenevoleComponent } from './benevole/add-benevole/add-benevole.component';
import { ListBenevoleComponent } from './benevole/list-benevole/list-benevole.component';
import { AgendaComponent } from './acti/agenda/agenda.component';
import { RecurrenceEditorModule, ScheduleModule, DayService,WorkWeekService, WeekService,MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AfficheBenevoleComponent } from './benevole/affiche-benevole/affiche-benevole.component';
import { AfficheActiComponent } from './acti/affiche-acti/affiche-acti.component';
import { AuthGuardService as Guard }  from './service/auth-guard-service.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RapportComponent } from './acti/rapport/rapport.component';
registerLocaleData(localeFr, 'fr');
const routes: Routes = [
  { path: 'actis', component: ListActiComponent, canActivate: [Guard] },
 // { path: 'acti', component: AddActiComponent, canActivate: [Guard] },
 // { path: 'benevole', component: AddBenevoleComponent, canActivate: [Guard] },
  { path: 'home', component: HomeComponent, canActivate: [Guard] },
  { path: 'login', component: LoginComponent },
  { path: 'agenda', component: AgendaComponent, canActivate: [Guard] },
  { path: 'benevoles', component: ListBenevoleComponent, canActivate: [Guard] },
  //{ path: 'affichebenevole', component: AfficheBenevoleComponent , canActivate: [Guard]},
 // { path: 'afficheActi', component: AfficheActiComponent, canActivate: [Guard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  entryComponents: [AddActiComponent],
  declarations: [
    AppComponent, 
    AddActiComponent,
    ListActiComponent,
    AddBenevoleComponent,
    ListBenevoleComponent,
    AgendaComponent,
    HomeComponent,
    LoginComponent,
    AfficheBenevoleComponent,
    AfficheActiComponent,
    RapportComponent,

  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    FlexLayoutModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ScheduleModule,
    RecurrenceEditorModule,
    DateTimePickerModule,
    DropDownListModule,
    TimePickerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  exports:[RouterModule],
  providers: [ LoginService, JwtHelperService, Guard,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {provide: LOCALE_ID, useValue: 'fr' },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: { clickAction: 'check' } as MatCheckboxDefaultOptions,
    },
    DayService,WorkWeekService, WeekService,MonthService, MonthAgendaService,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {
  constructor() {
    console.log(environment.production); // Logs false for default environment
  }
  title = 'app works!';
}
