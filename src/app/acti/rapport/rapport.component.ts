import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiService } from 'src/app/service/acti.service';
import { RapportService } from 'src/app/service/rapport.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
  public data: object[] = [];
  selectedYear: number;
  years: number[] = [];
  constructor( public crudApi: RapportService,  public fb: FormBuilder, private router: Router) { 
    this.selectedYear = new Date().getFullYear();
  for (let year = this.selectedYear; year >= 2020; year--) {
    this.years.push(year);
  }
  }

  ngOnInit(): void {
    this.infoForm();
  }
  resetForm() {
    this.crudApi.choixmenu = 'A';
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
   console.log(this.crudApi.dataForm.value) ;
   this.crudApi.GetRapport(this.crudApi.dataForm.value.nomResponsable,this.crudApi.dataForm.value.nomEduc,this.crudApi.dataForm.value.yearRapport).subscribe((data) => {
    window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
     window.open(window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' })));
   });
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      nomResponsable: ['', [Validators.required]],
      nomEduc: ['', [Validators.required]],
      yearRapport:new FormControl(),
    });
  }
}