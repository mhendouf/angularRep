import { formatDate, registerLocaleData } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Acti } from 'src/app/modele/acti';
import { Benevole } from 'src/app/modele/benevole';
import { ActiService } from 'src/app/service/acti.service';
import { LoginService } from 'src/app/service/login.service';
import { AddActiComponent } from '../add-acti/add-acti.component';
import localeFr from '@angular/common/locales/fr';
import { AfficheActiComponent } from '../affiche-acti/affiche-acti.component';
import { RapportComponent } from '../rapport/rapport.component';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-list-acti',
  templateUrl: './list-acti.component.html',
  styleUrls: ['./list-acti.component.scss'],
})
export class ListActiComponent implements OnInit {
//test
  public data: object[] = [];
  public test= 0;
      public selectedDate: Date = new Date();
   
  filterTerm: string;
   mapbenevole = new Map<number, string>();
  acti: Acti;
  listData: Observable<Acti[]>;
  listDataBenevole: Observable<Benevole[]>;
  selectedItems: Acti[];
  titre:string;
  config: any;
  constructor(private dialog:MatDialog,
    public crudApi: ActiService, public crudApilog: LoginService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder, public loginService:LoginService,
    public dialogRef:MatDialogRef<AddActiComponent>,
  ) {
    
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  ngOnInit(): void {
   
    if(!this.loginService.isAuthenticated()){
      this.toastr.error("Vous n'etes pas connectes!!!")
        this.loginService.logout();
        this.router.navigateByUrl('/home');
      
    }
    else {
      this.getData();
      this.listData.subscribe(act=>{
        act.forEach(a=>{
          let dat = new Date(a.date_acti);
          let fin = new Date(a.date_acti_fin);
          let d: object  = {
            id: a.id,
            eventName: a.titre,
            startTime: dat,
            endTime: fin,
            isAllDay: false
              };
          this.data.push(d);
        })
      })
    }
    this.selectedItems = new Array<Acti>();
    this.ActisBenevoles(23);
  
  }
  getData() {
    let p = 0;
    this.mapbenevole.delete;
    this.listData = this.crudApi.getAll();
    if (this.listData!=null){
    this.listData.forEach(ac=>{
      this.test=1;
      ac.forEach(a=>{
        
        a.benevoles_list.forEach(b=>{
          ++p;
          if(this.mapbenevole.get(a.id))
           this.mapbenevole.set(a.id,this.mapbenevole.get(a.id)+", "+b.nom);
           else
           this.mapbenevole.set(a.id,b.nom);
         // console.log('list benevoooooooooole Nom : ' + this.mapbenevole.get(a.id));
        }, err=>{
          this.crudApilog.logout();
          this.router.navigateByUrl("/home");
          
        });
      }, err=>{
        this.crudApilog.logout();
        this.router.navigateByUrl("/home");
        
      });
   //   console.log('list benevoooooooooole : ' + ac);
    });
   // this.crudApilog.saveToken(  this.crudApilog.getToken());
  //this.toastr.success('userrrrrr : ' + this.crudApilog.getUsername());
  }

  this.config = {
    id: 'basicPaginate',
    itemsPerPage: 7,
    currentPage: 1,
    totalItems: p
  };
  }

  removeData(id: number) {
    if (window.confirm('ETES-VOUS SUR DE SUPPRIMER CECI?')) {
      this.crudApi.deleteData(id).subscribe(
        (data) => {
          this.toastr.warning('Suppr OK!!');
          this.getData();
        },
        (erro) => console.log(erro)
      );
    }
    window.location.reload();
  }
  selectData(item: Acti) {
    this.crudApi.choixmenu = 'M';
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.dialog.open(AddActiComponent,dialogConfig);
  }
  onPDF(e: any, item: Acti) {
    if (e.target.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter((m) => m != item);
    }
    console.log(this.selectedItems);
  }
  onPDF1() {

    this.crudApi.getDataPDF(this.selectedItems).subscribe((data) => {
     window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
      window.open(window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' })));
    });
  }
  addActi(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.dialog.open(AddActiComponent,dialogConfig);
  }
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.dialog.open(AddActiComponent,dialogConfig);
  }
  

  openRapport(){
    console.log('list benevoooooooooole : ' );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.dialog.open( RapportComponent,dialogConfig);
  }
  openDialogActi(idacti:Number){
    this.crudApi.idacti = idacti;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="100%";
    this.dialog.open(AfficheActiComponent,dialogConfig);
  }
  selectActi(item: Acti) {
    /*   this.crudApi.choixmenu = 'M';
      this.crudApi.dataFormBenevole = this.fb.group(Object.assign({}, item));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus=true;
      dialogConfig.disableClose=true;
      dialogConfig.width="50%";
      this.dialog.open(AddBenevoleComponent,dialogConfig); */
     // this.crudApi.idBenevole=item.id;
      localStorage.setItem("idacti",String(item.id));
      this.router.navigate(['/afficheActi']);
    }

    ActisBenevoles(idBenevole: number){
      idBenevole= 23;
      this.crudApi.getActisBenevoles(idBenevole).subscribe(b=>{
      })
    }
}
