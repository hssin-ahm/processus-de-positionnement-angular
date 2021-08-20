import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAthService: UserAuthService
  ) { }

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }
  public roulesMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAthService.getRoles();
 
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          console.log(userRoles[i].roleName);
          
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;

          } else {
            return isMatch;
          }
        }
      }
    }
  }
}