import { formatDate } from '@angular/common';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Benevole } from '../modele/benevole';
import { Passage } from '../modele/passage';

@Injectable({
  providedIn: 'root'
})
export class BenevoleService {
  private baseUrl = 'http://https://actibene.herokuapp.com/benevole';
  private baseUr = 'http://https://actibene.herokuapp.com';
  choixmenu: string = 'A';
  listData:any;
  public dataFormBenevole: FormGroup;
  public jwtToken = null;
  public idBenevole = null;
  constructor(private http: HttpClient) {}

  getImg(imageName: string): Observable<any> {
   
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.baseUrl+'/imgprofile/'+imageName,{headers:new HttpHeaders({'Authorization': this.jwtToken})});

  }
  getData(id: number): Observable<object> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.baseUrl + '/' + id,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  getDataSearch(titre: string): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.baseUrl + '/search/' + titre,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  loadToken(){
    this.jwtToken= localStorage.getItem('token');
  }
  getDataPDF(benevoles: Benevole[]): Observable<Blob> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.put(this.baseUrl + '/pdf/', benevoles, {
      responseType: 'blob',headers:new HttpHeaders({'Authorization': this.jwtToken})
    },);
  }
  creatData(info: Object): Observable<object> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.post(this.baseUrl, info,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  updateDate(id: number, value: any): Observable<object> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.put(this.baseUrl + '/' + id, value,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  deleteData(id: number): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.delete(this.baseUrl + '/' + id, { responseType: 'text', headers:new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  getAll(): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.baseUrl,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  upload(file: Object): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    //formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUr}/upload`, file,{headers:new HttpHeaders({'Authorization': this.jwtToken}),
    reportProgress: true,
    responseType: 'json'} );

    return this.http.request(req);
  } 
  dowload(file: string | undefined): Observable<Blob> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(`${this.baseUr}/files/${file}`, {headers:new HttpHeaders({'Authorization': this.jwtToken}),
    responseType: 'blob'});
  }
  getFiles(id:string): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(`${this.baseUr}/file/`+id,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  getPassage(id:number): Observable<any> {
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(`${this.baseUr}/passage/`+id,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
  postPassage(id:string): Observable<any> {
    const savePassage = new FormData();
    let date = new Date();
    const format = 'yyyy/MM/dd';
    const locale = 'fr-FR';
    const formattedDate = formatDate(date, format, locale)
    savePassage.append("id",id);
    savePassage.append("date",JSON.stringify(formattedDate));
    if (this.jwtToken == null){
      this.loadToken();
    }
    return this.http.post(`${this.baseUr}/passage`,savePassage,{headers:new HttpHeaders({'Authorization': this.jwtToken})});
  }
}