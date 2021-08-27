import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/super-admin/user';
import { UserService } from 'src/app/super-admin/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
  }
  getUserName(){
    return localStorage.getItem("userName");
  }
  getFullName(){
    return localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
  }
}
