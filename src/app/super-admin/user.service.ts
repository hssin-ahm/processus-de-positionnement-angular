import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { UserAuthService } from '../_services/user-auth.service';

@Injectable({providedIn: 'root'})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
    private userAuthService: UserAuthService
    ){}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/save`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }
  
  public deleteUser(userName: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userName}`);
  }
}
