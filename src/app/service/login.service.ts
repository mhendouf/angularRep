import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url="https://actibene.herokuapp.com/"
  private jwtToken = null;
  public dataForm: FormGroup;
  private roles: Array<any>=null;
  public username:string;
  constructor(private http : HttpClient, public jwtHelper:JwtHelperService) { }

  getTasks(): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.url+'benevole',{headers:new HttpHeaders({'Authorization': this.jwtToken})});

  }

  loadToken(){
    this.jwtToken=  localStorage.getItem('token');
  }
  saveToken(jwt:string){
  // this.username= localStorage.getItem('username');
   localStorage.setItem('token', jwt);
    this.loadToken();
    this.roles=this.jwtHelper.decodeToken(this.jwtToken).roles;
  }
  loginUser(user){
    this.logout();
    this.username=user.username;
    localStorage.setItem('username',user.username );
    return this.http.post(this.url+"login",user, {observe:'response'});
  }
  isLoggedIn(){
    let token =  localStorage.getItem("token");
    if(token==undefined || token==='' || token==null)
    {
      return false;
    }
    else
    {
      return true;
    } 
  } 
  logout(){
    localStorage.clear();
    localStorage.clear();
   // this.http.get(this.url+"logout", {observe:'response'});
    this.jwtToken = null;
    return this.http.post(this.url+"logout", {observe:'response'});
  }
  
  isAdmin(){
    this.loadToken();
    this.roles=this.jwtHelper.decodeToken(this.jwtToken).roles;
    let name =this.jwtHelper.decodeToken(this.jwtToken).user;
    if(this.roles)
    for(let r of this.roles){
      if (r.authority=='ADMIN') {
        return true};
    }
    return false;
  }
  getUsername(){
    return localStorage.getItem('username');
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
   
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentzUser(){
   
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.url + 'user' , { responseType: 'text',headers:new HttpHeaders({'Authorization': this.jwtToken}) });
  }
}