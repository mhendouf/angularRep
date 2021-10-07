import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Acti } from 'src/app/modele/acti';
import { Benevole } from 'src/app/modele/benevole';
import { ActiService } from 'src/app/service/acti.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-affiche-acti',
  templateUrl: './affiche-acti.component.html',
  styleUrls: ['./affiche-acti.component.scss']
})
export class AfficheActiComponent implements OnInit {
  id:string ;
  acti;
  benevolelist:Benevole[];
  constructor(private dialog:MatDialog, public loginService: LoginService,
    public crudApi: ActiService,
    public toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
     this.acti=this.crudApi.getData(this.crudApi.idacti);
     this.acti.subscribe(b=>{
      this.acti =b;
      this.benevolelist= this.acti.benevoles_list;
      });

  
  }

  ActiDone(id:number){
    
    this.crudApi.ValideActi(id).subscribe(tr=>{
      this.ngOnInit();
     
    })
    this.toastr.success('Validation Faite Avec Success ');
   
  }
  resetForm() {
    window.location.reload();
  }
}
