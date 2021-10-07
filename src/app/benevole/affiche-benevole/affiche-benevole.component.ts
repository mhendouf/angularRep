import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Benevole } from 'src/app/modele/benevole';
import { BenevoleService } from 'src/app/service/benevole.service';
import { LoginService } from 'src/app/service/login.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-affiche-benevole',
  templateUrl: './affiche-benevole.component.html',
  styleUrls: ['./affiche-benevole.component.scss']
})
export class AfficheBenevoleComponent implements OnInit {
  public today = new Date();
 /* Upload files */
 selectedFiles: FileList;
 currentFile: File;
 progress = 0;
 message = '';
 fileInfos: Observable<any>;
 file = null;
 retrieveResponse= null;
  bas64Data= null;
  retrievedImage=null;
  titre:string;
  mapImg = null;
 /* Upload files */
 benevoleData  = null ;
 id;
  constructor(public loginService: LoginService,
    public crudApi: BenevoleService,
    public toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
   
    this.id=this.crudApi.idBenevole;
    this.fileInfos = this.crudApi.getFiles(this.id);
    this.fileInfos.forEach(s=>{
    });
    
   
      
    //  this.id=this.crudApi.idBenevole;
     let bene=this.crudApi.getData(Number(this.id));
     bene.subscribe(b=>{
       this.initBenevole(b);
       this.getIMGP(Number(this.id), this.benevoleData.img_profile);
      });

    
  }
  initBenevole(bene:any){
    this.benevoleData=bene;
  }
  getIMGP(id: number, img: string){
    this.file = this.crudApi.getImg(img).subscribe(res=>{
      this.retrieveResponse=res;
      this.bas64Data = this.retrieveResponse.picByte;
      this.retrievedImage= 'data:image/jpg;base64,' + this.bas64Data;
      //this.mapImg.set(id,this.retrievedImage);
     // return this.retrievedImage;
    }); 
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const uploadData = new FormData();
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    uploadData.append('file', this.currentFile);
    uploadData.append('benevole',this.id );
    this.crudApi.upload(uploadData).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
         
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message; 
         }
      },
      err => {
       // this.progress = 0;
        //this.message = 'Patientez...';
       // this.currentFile = undefined;
        //this.ngOnInit();
      //  window.location.reload();
      this.ngOnInit();
      });
      this.fileInfos = this.crudApi.getFiles(this.id);
       this.selectedFiles = undefined;
       
  }
  downloadfile(f ){
    this.progress=0;
    let fi =f;
  f=this.id+"²"+f;
    this.crudApi
      .dowload(f)
      .subscribe(blob => saveAs(blob, fi));
  }
  resetForm() {
    this.crudApi.choixmenu = 'A';
  }
}
