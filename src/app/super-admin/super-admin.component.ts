import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { User } from './user';
import { UserService } from './user.service';
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  public users: User[];
  public editUser: User;
  public deleteUser: User;


  constructor(private userAuthService: UserAuthService, private router :Router, private userService: UserService){}
  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form').click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateUser(editForm: NgForm): void {
    
    this.userService.updateUser(editForm.value).subscribe(
      (response: User) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteUser(userName: string): void {
    this.userService.deleteUser(userName).subscribe(
      (response: void) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUsers(key: string): void {
    const results: User[] = [];
    for (const user of this.users) {
      if (user.userName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.userFirstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.userLastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.userPassword.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }

  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      this.editUser = user;
      
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container.appendChild(button);
    button.click();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(["/login"])
  }
}
