import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //url: any = null;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  // constructor(private userAuthService: UserAuthService, private router :Router, public userService: UserService ) { }
  constructor(private userAuthService: UserAuthService, private router :Router){  }
  ngOnInit(): void {
  }
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }
  // public isLoggedIn(){
  //   return this.userAuthService.isLoggedIn();
  // }

   public logout(){
     this.userAuthService.clear();
     this.router.navigate(["/login"])
   }

  // public saveUrl(url){
  //   const supelement = document.querySelector('.active');
  //   supelement.classList.remove('active');
  //   const element = document.getElementById(url);
  //   element.classList.add('active');
  //   this.url = url;
  // }

  // public getPathName(){
  //   return location.pathname;
  // }
  // public show(){
  //   if (this.userService.roulesMatch(['Admin']) && this.getPathName()!== "/forbidden") {
  //     return true;
  //   }
  //   return false;
  // }
 
}