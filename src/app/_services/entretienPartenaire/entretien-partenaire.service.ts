import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entretien } from './entretien';

@Injectable({
  providedIn: 'root'
})
export class EntretienPartenaireService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getEntretiens(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`${this.apiServerUrl}/entretien/get-all-Entretiens`);
  }

  public addEntretien(entretien: Entretien, consultantId: number): Observable<Entretien> {
    return this.http.post<Entretien>(`${this.apiServerUrl}/entretien/ajouterEntretien/${consultantId}`, entretien);
  }

  public updateEntretien(entretien: Entretien, cvId: number, consId: number): Observable<Entretien> {
    return this.http.put<Entretien>(`${this.apiServerUrl}/entretien/modifyidEntretien/${cvId}/${consId}`, entretien);
  }

  public deleteEntretien(entretienId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/entretien/deleteE/${entretienId}`);
  }
  public getAllEntretiensByConsultantId(entretienId: number): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`${this.apiServerUrl}/entretien/get-all-Entretiens/${entretienId}`);
  }
  public getEntretiensByCvId(cvid: number): Observable<Entretien> {
    return this.http.get<Entretien>(`${this.apiServerUrl}/entretien/getEntretienByCvId/${cvid}`);
  }
}
