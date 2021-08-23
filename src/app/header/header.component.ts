import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  url: any = null;

  constructor(private userAuthService: UserAuthService, private router :Router, public userService: UserService ) { }

  ngOnInit(): void {
  }
  
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(["/login"])
  }

  public saveUrl(url){
    const supelement = document.querySelector('.active');
    supelement.classList.remove('active');
    const element = document.getElementById(url);
    element.classList.add('active');
    this.url = url;
  }

  public getPathName(){
    return location.pathname;
  }
  public show(){
    if (this.userService.roulesMatch(['Admin']) && this.getPathName()!== "/forbidden") {
      return true;
    }
    return false;
  }
 
}