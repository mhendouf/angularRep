import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Benevole } from 'src/app/modele/benevole';
import { BenevoleService } from 'src/app/service/benevole.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-add-benevole',
  templateUrl: './add-benevole.component.html',
  styleUrls: ['./add-benevole.component.scss']
})
export class AddBenevoleComponent implements OnInit {
msgImg = null;
imgPath = null;
imgUrl = null;
userFile = null;
benevole:Benevole;
  constructor(public crudApi: BenevoleService,public crudApiLogin: LoginService, public fb: FormBuilder,  private router: Router,
    public toastr: ToastrService, public dialogRef:MatDialogRef<AddBenevoleComponent>) { 
      
    }

  ngOnInit(): void {
    if (this.crudApi.choixmenu == 'A') {
      this.infoForm();
    }
  }
  infoForm() {
    this.crudApi.dataFormBenevole = this.fb.group({
      nom: ['', [Validators.required]],
      prenom:['', [Validators.required, Validators.minLength(2)]],
      num_tel: ['', [Validators.required, Validators.minLength(2)]],
     // convention: ['', [Validators.required, Validators.minLength(2)]],
      mail: ['', [Validators.required, Validators.minLength(2)]],
      img_profile: ['', [Validators.required, Validators.minLength(2)]],
      root: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  onSubmit(){
    if (this.crudApi.choixmenu == 'A') {
      this.addData();
    } else {
      this.updateDate();
    }
    this.dialogRef.close();
    
    this.crudApi.getAll().subscribe(response=>{
      response[response.length]=this.crudApi.dataFormBenevole.value;
      this.crudApi.listData=response;
      this.router.navigate(['/benevoles']);
      window.location.reload();
    });
  }
  addData() {
    const uploadImageData = new FormData();
   this.benevole = this.crudApi.dataFormBenevole.value;
   this.benevole.id_user = this.crudApiLogin.getUsername();
    uploadImageData.append('benevole',JSON.stringify(this.benevole) );
    uploadImageData.append('file', this.userFile, this.userFile.name);
    this.crudApi.creatData(uploadImageData).subscribe((data) => {
      this.toastr.success('Validation Faite Avec Success ');
      this.resetForm();
    });
  }
 
/*   addData() {
    let acti = this.crudApi.dataFormBenevole;

    console.log(" adddddddddddddddddd"+acti);
    this.crudApi.creatData(this.crudApi.dataFormBenevole.value).subscribe((data) => {
      this.toastr.success('Validation Faite Avec Success ');
      this.resetForm();
    });
  } */
  resetForm() {
    this.crudApi.choixmenu = 'A';
    this.crudApi.dataFormBenevole.reset();
  }
   updateDate() {
    this.crudApi
      .updateDate(this.crudApi.dataFormBenevole.value.id, this.crudApi.dataFormBenevole.value)
      .subscribe((data) => {
        this.toastr.success('mod Faite Avec Success');
        this.resetForm();
      });
  }
  onSelectImg(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.userFile = file;
      if(event.target.files[0].type.match(/image\/*/)==null){
        this.msgImg = "Merci de choisir une image valable";
        return
      }
      var reader = new FileReader();
      this.imgPath= file;
      reader.readAsDataURL(file);
      reader.onload = (_event)=>{
        this.imgUrl= reader.result;
      }
      console.log(event.target.files[0].type);

    }
    
  } 
}
