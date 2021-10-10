import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { Acti } from '../modele/acti';
import{Subject} from 'rxjs'; 
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class ActiService {
  private baseUrl = 'http://https://actibene.herokuapp.com/acti';
  private jwtToken =null;
  choixmenu: string = 'A';
  idacti;
  listData:any;
  public dataForm: FormGroup;

  constructor(private http: HttpClient,  public jwtHelper:JwtHelperService) {}
  loadToken(){
    this.jwtToken= localStorage.getItem('token');
  }

  getData(id: number): Observable<object> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.baseUrl + '/' + id,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  getDataSearch(titre: string): Observable<any> {
    return this.http.get(this.baseUrl + '/search/' + titre,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
 
  getDataPDF(actis: Acti[]): Observable<Blob> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.put(this.baseUrl+"/pdf" , actis , {
      responseType: 'blob', headers:new HttpHeaders({'Authorization': this.jwtToken})
    });
  }
  creatData(info: Object): Observable<object> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.post(this.baseUrl, info,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  updateDate(id: number, value: Object): Observable<object> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.put(this.baseUrl + '/' + id, value,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  deleteData(id: number): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.delete(this.baseUrl + '/' + id, { responseType: 'text',headers:new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  getAll(): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.baseUrl,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  private _listners = new Subject<any>();
  listen():Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }
  ValideActi(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/valide/' + id,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }

  getActisBenevoles(idBenevole: number): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    idBenevole = 23;
    return this.http.get(this.baseUrl + '/benevoles/' + idBenevole,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
}
