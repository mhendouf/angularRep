import { Component, OnInit } from '@angular/core';
import { AgendaService, DayService, MonthService, TimelineViewsService, WeekService } from '@syncfusion/ej2-angular-schedule';
import { L10n, loadCldr } from '@syncfusion/ej2-base';

import { EventSettingsModel } from '@syncfusion/ej2-schedule';
import { Observable } from 'rxjs';
import { Acti } from 'src/app/modele/acti';
import { ActiService } from 'src/app/service/acti.service';
declare var require: any;

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/fr-CH/ca-gregorian.json'),
    require('cldr-data/main/fr-CH/numbers.json'),
    require('cldr-data/main/fr-CH/timeZoneNames.json'));

L10n.load({
    'fr-CH': {
        'schedule': {
            'day': 'journée',
            'week': 'La semaine',
            'workWeek': 'Semaine de travail',
            'month': 'Mois',
            'today': 'Aujourd`hui',
            'agenda': 'Ordre du jour',
        }
    }
});


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  providers: [DayService, WeekService, TimelineViewsService, MonthService, AgendaService],
})
export class AgendaComponent implements OnInit {
  public startWeek: number = 1;
  listData: Observable<Acti[]>;
  ac: Acti;
  public data: object[] = [];
public selectedDate: Date = new Date();

public eventSettings: EventSettingsModel = {
    dataSource: this.data
}
  
  constructor( public crudApi: ActiService) { } 

  public showHeaderBar: Boolean = true;

   ngOnInit(): void { 
    this.getData();
    this.listData.forEach(acti=>{
     
      acti.forEach(a=>{
        let dat = new Date(a.date_acti);
          let fin = new Date(a.date_acti_fin);
          
       let d= new Date(a.date_acti);
        if(a.repetition=='DAILY' ||a.repetition=='WEEKLY' || a.repetition=='MONTHLY' ){
        let b: Object = {
          Id: a.id,
          Subject: a.titre,
          StartTime:dat,
          EndTime:fin,
         // RecurrenceRule: 'FREQ='+a.repetition,//+';COUNT=20'
         IsReadonly:true,
        ResourceID: a.id,
        GroupID: a.id
        }
        this.data.push(b);
        }
        else{
          let b: Object = {
            Id: a.id,
            Subject: a.titre,
            StartTime:dat,
            EndTime: fin,
            Description:a.description + " (Participants : "+ a.participants +")",
           IsReadonly:true,
           ResourceID: a.id,
           Color: '#bbdc00', 
           Designation: 'Optometrist',
           GroupID: a.id
          }
          this.data.push(b);
        }
        
      }

      )
    });

  } 
  getData() {
    this.listData = this.crudApi.getAll();
  }
}
