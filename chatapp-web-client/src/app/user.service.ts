import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { RequestService } from './request.service';

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { APIURL } from './config';

@Injectable()
export class UserService {

  constructor(private request: RequestService) {  }

  doLogin(username: string, password: string) {
    return this.request.postRequest(APIURL + 'login', {username: username, password: password}, false);
  }

  storeToken(token:string){
    localStorage.setItem('token', token);
  }

}
