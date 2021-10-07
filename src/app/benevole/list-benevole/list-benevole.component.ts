import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { Benevole } from 'src/app/modele/benevole';
import { BenevoleService } from 'src/app/service/benevole.service';
import { LoginService } from 'src/app/service/login.service';
import { AddBenevoleComponent } from '../add-benevole/add-benevole.component';
import { AfficheBenevoleComponent } from '../affiche-benevole/affiche-benevole.component';
@Component({
  selector: 'app-list-benevole',
  templateUrl: './list-benevole.component.html',
  styleUrls: ['./list-benevole.component.scss']
})
export class ListBenevoleComponent implements OnInit {
  config: any;
  filterTerm: string;
  /* Upload files */
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  /* Upload files */
  moisCourant=Date.now();
  benevole: Benevole;
  listData: Observable<Benevole[]>;
  selectedItems: Benevole[];
  retrieveResponse= null;
  bas64Data= null;
  retrievedImage=null;
  titre:string;
  file = null;

  mapImg = new Map<number, File>();
  constructor(private dialog:MatDialog, public loginService: LoginService,
    public crudApi: BenevoleService,
    public toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    public dialogRef:MatDialogRef<AddBenevoleComponent>,
  ) {

  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  Search(){
    if(this.titre.length>0)
    this.crudApi.getDataSearch(this.titre).subscribe(data=>{
      if( data.length > 0 ){
        this.listData = this.crudApi.getDataSearch(this.titre);
        
      }
      else{
        this.getData();
      }
    });
    else
    this.getData();
   
  }

  ngOnInit(): void { 
   
      this.getData();
      this.selectedItems = new Array<Benevole>();
  }
  getIMGP(id: number, img: string){
    this.file = this.crudApi.getImg(img).subscribe(res=>{
      this.retrieveResponse=res;
      this.bas64Data = this.retrieveResponse.picByte;
      this.retrievedImage= 'data:image/jpg;base64,' + this.bas64Data;
      this.mapImg.set(id,this.retrievedImage);
     // return this.retrievedImage;
    }); 
  }
  getData() {
    let p=0;
    this.mapImg.delete;
    this.listData = this.crudApi.getAll();
      this.listData.subscribe(b=>{
        b.forEach(bn=>{
          ++p;
          this.getIMGP(bn.id,bn.img_profile);
        })
      })
     /* this.file = this.crudApi.getImg("52635837_402347536976767_530085091305586688_n.jpg").subscribe(res=>{
      console.log("IMMMMMMMMMMMMMMMMMMMMMMMMM")
      this.retrieveResponse=res;
      this.bas64Data = this.retrieveResponse.picByte;
      this.retrievedImage= 'data:image/jpg;base64,' + this.bas64Data;
     
    });  */
    this.config = {
      id: 'basicPaginate',
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: p
    };
  
  }

  removeData(id: number) {
    if (window.confirm('ETES-VOUS SUR DE SUPPRIMER CECI?')) {
      this.crudApi.deleteData(id).subscribe(
        (data) => {
          console.log(data);
          this.toastr.warning('Suppr OK!!');
          this.getData();
        },
        (erro) => console.log(erro)
      );
    }
  }
  selectData(item: Benevole) {
  /*   this.crudApi.choixmenu = 'M';
    this.crudApi.dataFormBenevole = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.dialog.open(AddBenevoleComponent,dialogConfig); */
   // this.crudApi.idBenevole=item.id;
    localStorage.setItem("idbenevole",String(item.id));
    this.router.navigate(['/affichebenevole']);
  }
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.dialog.open(AddBenevoleComponent,dialogConfig);
  }
  openDialogModifier(item: Benevole){
    this.crudApi.choixmenu = 'M';
    this.crudApi.dataFormBenevole = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.dialog.open(AddBenevoleComponent,dialogConfig);
  }

  openDialogBenevole(idbenevole:Number){
    this.crudApi.idBenevole=idbenevole;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.height="80%";
    dialogConfig.width="100%";
    this.dialog.open(AfficheBenevoleComponent,dialogConfig);
  }

/*   selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.crudApi.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
      this.fileInfos = this.crudApi.getFiles();
    this.selectedFiles = undefined;
    window.location.reload();
  }
  downloadfile(f ){

    this.crudApi
      .dowload(f)
      .subscribe(blob => saveAs(blob, f));
       
  } */
}
