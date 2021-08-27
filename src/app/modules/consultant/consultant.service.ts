import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consultant } from './consultant';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getConsultants(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(`${this.apiServerUrl}/consultant/all`);
  }

  public addConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(`${this.apiServerUrl}/consultant/add`, consultant);
  }

  public updateConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.put<Consultant>(`${this.apiServerUrl}/consultant/update`, consultant);
  }
  
  public deleteConsultant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/consultant/delete/${id}`);
  }

  public getConsultant(id : number): Observable<Consultant> {
    return this.http.get<Consultant>(`${this.apiServerUrl}/consultant/find/${id}`);
  }
}