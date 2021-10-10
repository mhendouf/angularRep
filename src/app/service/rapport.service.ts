import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  private baseUrl = 'http://https://actibene.herokuapp.com/acti';
  private jwtToken =null;
  choixmenu: string = 'A';
  idacti;
  listData:any;
  public dataForm: FormGroup;

  constructor(private http: HttpClient) {}


  loadToken(){
    this.jwtToken= localStorage.getItem('token');
  }

  GetRapport(nomResponsable:string,nomEduc:string, yearRapport:string): Observable<any> {
    const savePassage = new FormData();
    if (this.jwtToken == null){
      this.loadToken();
    }
    savePassage.append("nomresponsable",nomResponsable);
    savePassage.append("nomeduc",nomEduc);
    savePassage.append("yearrapport",yearRapport);
    
    console.log("OKKKKKKKKKKKKKK") ;

    return this.http.put(this.baseUrl+"/rapport" , savePassage , {
      responseType: 'blob', headers:new HttpHeaders({'Authorization': this.jwtToken})
    });
  }
}