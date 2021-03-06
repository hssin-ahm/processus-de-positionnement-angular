import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg = '';
  constructor(
    private userService: UserService,
     private userAuthService: UserAuthService,
     private router :Router
     ) { }

  ngOnInit(): void {
    this.getReturnUrl();

  }

  getReturnUrl(): void{
    const userRoles: any = this.userAuthService.getRoles();
    
    if (this.userAuthService.isLoggedIn()) {
      if (userRoles[0].roleName === 'Super_Admin') {
        this.router.navigate(['/super-admin']);
      }else{
        this.router.navigate(['/admin/page/1']);
      }
    }
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response:any) => {
        localStorage.setItem("userName", response.user.userName);
        localStorage.setItem("firstName", response.user.userFirstName);
        localStorage.setItem("lastName", response.user.userLastName);
        this.userAuthService.setRoles(response.user.role)
        this.userAuthService.setToken(response.jwtToken)
        const role = response.user.role[0]['roleName'];
        
        if (role === "Super_Admin") {
          this.router.navigate(['/super-admin']);
        }else{
          this.router.navigate(['/admin/page/1']).then(() => {
            window.location.reload();
          });
  
        }
      },
      (error) => {
        this.msg = "Bad credentials, please enter valid user name and password"
      }
    );
  }
}

