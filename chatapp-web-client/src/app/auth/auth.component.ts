import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public username:string = "";
  public email:string = "";
  public password:string = "";
  public verifiedPassword:string = "";
  public error:string = "";
  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  public doLogin(){
    if(this.username != "" && this.password != ""){
      this.userService.doLogin(this.username, this.password)
      .subscribe(response => {
        if(response['status']){
          this.userService.storeToken(response['token']);
          //Redirect!
        }else{
          this.error = response['message'];
        }
      });
    }
  }

}
