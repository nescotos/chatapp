import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class RequestService {

  constructor(private http: Http) {
  }

  public postRequest(url:string, parameters:any, secured = true){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    if(secured){
      headers.append('X-ACCESS-TOKEN', this.getToken());
    }
    return new Observable(observable => {
      this.http.post(url, JSON.stringify(parameters), {headers: headers})
      .map( res => res.json())
      .subscribe(res => {
        observable.next(res);
      }, err => {
        console.log(err);
      });
    });
  }

  public getRequest(url:string, secured = true){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    if(secured){
      headers.append('X-ACCESS-TOKEN', this.getToken());
    }
    return new Observable(observable => {
      this.http.get(url, {headers: headers})
      .map( res => res.json())
      .subscribe(res => {
        observable.next(res);
      }, err => {
        console.log(err);
      });
    });
  }

  public getToken(){
    let token =  localStorage.getItem('token');
    if(token){
      return token;
    }
    return undefined;
  }

}
