import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  constructor(private userAuthService: UserAuthService,
    private router :Router) { }

  ngOnInit(): void {
  }
  getReturnUrl(): void{
    const userRoles: any = this.userAuthService.getRoles();
    
    if (userRoles !== null) {
      if (userRoles[0].roleName === 'Super_Admin') {
        this.router.navigate(['/super-admin']);
      }else{
        this.router.navigate(['/admin']);
      }
    }else{
      this.router.navigate(['/login']);
    }
  }
}
