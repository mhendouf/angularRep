import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
credentials ={
  id:'',
  username:'',
  password:''

}
infoForm() {
  this.crudApi.dataForm = this.fb.group({
    username: ['', [Validators.required]],
    password:['', [Validators.required, Validators.minLength(2)]],
   
  });
}
mode: number = 0;
private baseUrl = 'http://localhost:4200';
  constructor(public toastr: ToastrService, public crudApi:LoginService,public fb: FormBuilder, private http:HttpClient, private route: Router) { }

  ngOnInit(): void {
    if(this.crudApi.isAuthenticated()){
      this.route.navigateByUrl('/actis');
    }
    else{
      this.infoForm();
      this.crudApi.logout();
    }
    
  }
  onSubmit(){
     this.credentials.username = this.crudApi.dataForm.value.username;
     this.credentials.password = this.crudApi.dataForm.value.password;
    if((this.credentials.username != '' && this.credentials.password !='')&&(this.credentials.username != null && this.credentials.password !=null)){
      this.crudApi.loginUser(this.credentials).subscribe(data=>{
        let jwt=data.headers.get('Authorization');
        this.crudApi.saveToken(jwt);
        this.toastr.success("BIENVENUE : " + this.credentials.username);
        this.route.navigateByUrl('/actis');
        window.location.reload();
        
      },
      error=>{
        this.crudApi.logout();
        this.mode=1;
      }
      
      
      )
    } 
    //window.open(this.baseUrl+"/dashboard");
  }

}
