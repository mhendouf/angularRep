import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddActiComponent } from './acti/add-acti/add-acti.component';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gestionActivite';
  currentUser="";
  constructor(public loginService: LoginService, private route:Router,public toastr: ToastrService,
     private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef:MatDialogRef<AddActiComponent>,) {}
  
  ngOnInit(){
    if(this.loginService.isAuthenticated()){
       try {
    this.loginService.getCurrentzUser().subscribe(c=>{
      this.currentUser = c;
     });
      
    } catch (error) {
     // this.toastr.error("Vous n'etes pas connectes!!!")
      this.loginService.logout();
    }
       
     } 
     else {
      this.loginService.logout();
     }
   
    
  }
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.dialog.open(AddActiComponent,dialogConfig);
  }
  onLogout(){
    this.toastr.warning("MERCI DE VOTRE VISITE :)");
    this.loginService.logout();
    this.route.navigateByUrl('/');
  }
}
