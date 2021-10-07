import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiService } from 'src/app/service/acti.service';
import { ToastrService } from 'ngx-toastr';
import { Acti } from 'src/app/modele/acti';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Benevole } from 'src/app/modele/benevole';
import { BenevoleService } from 'src/app/service/benevole.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-add-acti',
  templateUrl: './add-acti.component.html',
  styleUrls: ['./add-acti.component.scss'],
})
export class AddActiComponent implements OnInit {
  titre =null;
  date=null;
   listBenevoles: Observable<Benevole[]>;
   selectedItems: Benevole[];
   selected = false;
   be: Benevole;
   acti : Acti;
  private actiForm: FormGroup;

  
private selectedLink: string="a";        
  
setradio(e: string): void   
{  

  this.selectedLink = e;  
        
}  

  isSelected(name: string): boolean   
{  

      if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
}  

      return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }  
  constructor(
    public crudApiBenevole:BenevoleService,
    private router: Router,
    public crudApi: ActiService,
    public crudApiLog: LoginService,
    public fb: FormBuilder, 
    public toastr: ToastrService,
    public dialogRef:MatDialogRef<AddActiComponent>,
  ) {
   
  }

  ngOnInit(): void {
   
    this.isSelected(this.selectedLink);
    this.getData();
   this.listBenevoles.forEach(da => {
    this.selectedItems = new Array<Benevole>();
  });
    if (this.crudApi.choixmenu == 'A') {
      this.infoForm();
    }
  }
  getBenevoles(){
    this.crudApi.getAll().subscribe(data=>{
      this.listBenevoles=data;
      data.forEach(element => {
        
      });
      
    });
   
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      titre: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      participants: ['', [Validators.required, Validators.minLength(2)]],
      date_acti: ['', [Validators.required, Validators.minLength(2)]],
      date_acti_fin: ['', [Validators.required, Validators.minLength(2)]],
      repetition: new FormControl(),
      nom_animateur: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  resetForm() {
    this.crudApi.choixmenu = 'A';
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == 'A') {
      this.addData();
    } else {
      this.updateDate();
    }
    //this.dialogRef.close();
    if(this.titre==null && this.date ==null){
      this.dialogRef.close();
      this.crudApi.getAll().subscribe(response=>{
        response[response.length]=this.crudApi.dataForm.value;
        this.crudApi.listData=response;
        this.router.navigate(['/actis']);
        window.location.reload();
      });
    }
     
    
   
  }
  addData() {

   this.acti  = this.crudApi.dataForm.value;
  this.acti.id_user = this.crudApiLog.getUsername();
   this.acti.benevoles_list = this.selectedItems;
   if(this.acti .repetition==null){
    this.acti .repetition = 'une fois'
   }
   if(this.acti.titre!=null&&this.acti.titre!='' ){
    this.titre=null;
    this.date=null;
    if(this.acti.date_acti<this.acti.date_acti_fin)
    this.crudApi.creatData(this.acti).subscribe((data) => {
    this.toastr.success('Validation Faite Avec Success');
   
    this.date=null
  });
  else
    this.date = "La date du début ne peut pas être supérieure ou égale à la date de la fin !!";
    
   }
   
    else
    this.titre ="Champ obligatoir";
      //  this.crudApiLog.saveToken(this.crudApiLog.getToken());
  //  this.toastr.success('Userrrrr noom apresss :' +this.crudApiLog.getUsername());
    
  }
  updateDate() {
    let acti = this.crudApi.dataForm.value;
    if(acti.date_acti<acti.date_acti_fin)
    {
      acti.benevoles_list = this.selectedItems;
      this.crudApi
        .updateDate(this.crudApi.dataForm.value.id, this.crudApi.dataForm.value)
        .subscribe((data) => {
          //this.toastr.success('mod Faite Avec Success');
          this.resetForm();
        });
    }
    else{
      this.toastr.warning('la date ne correspond pas');
    }
   
  }
  getData() {
    this.listBenevoles = this.crudApiBenevole.getAll();
  
  }

  
   onBenevoleMat(  item: Benevole) {

    if(this.selectedItems.indexOf(item) !== -1){
      this.selectedItems = this.selectedItems.filter((m) => m != item);
    }
      else{
    this.selectedItems.push(item);
  }
  } 

}
