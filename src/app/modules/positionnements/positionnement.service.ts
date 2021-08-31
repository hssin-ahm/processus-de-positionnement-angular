import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Positionnement } from './positionnement';

@Injectable({
  providedIn: 'root'
})
export class PositionnementService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getPositionnements(): Observable<Positionnement[]> {
    return this.http.get<Positionnement[]>(`${this.apiServerUrl}/positionnement/get-all-Positionnements`);
  }

  public addPositionnement(positionnement: Positionnement): Observable<Positionnement> {
    return this.http.post<Positionnement>(`${this.apiServerUrl}/positionnement/add`, positionnement);
  }

  public updatePositionnement(positionnement: Positionnement): Observable<Positionnement> {
    return this.http.put<Positionnement>(`${this.apiServerUrl}/positionnement/update`, positionnement);
  }
  
  public deletePositionnement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/positionnement/delete/${id}`);
  }

  public getPositionnement(id : number): Observable<Positionnement> {
    return this.http.get<Positionnement>(`${this.apiServerUrl}/positionnement/find/${id}`);
  }
  public findByKeyword(key: string): Observable<Positionnement[]> {
    return this.http.get<Positionnement[]>(`${this.apiServerUrl}/positionnement/findBy/${key}`);
  }
}
