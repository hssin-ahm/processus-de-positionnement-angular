import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entretien } from '../entretienPartenaire/entretien';
import { EntretienClient } from './entretienClient';

@Injectable({
  providedIn: 'root'
})
export class EntretienClientService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getEntretiens(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`${this.apiServerUrl}/entretienClient/get-all-EntretienClients`);
  }

  public addEntretien(entretien: Entretien, consultantId: number): Observable<Entretien> {
    return this.http.post<Entretien>(`${this.apiServerUrl}/entretienClient/ajouterEntretienClient/${consultantId}`, entretien);
  }

  public updateEntretien(entretien: Entretien): Observable<Entretien> {
    return this.http.put<Entretien>(`${this.apiServerUrl}/entretienClient/modifyididEntretienClient`, entretien);
  }

  public deleteEntretien(entretienId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/entretienClient/deleteEc/${entretienId}`);
  }
  public getAllEntretiensByConsultantId(entretienId: number): Observable<EntretienClient[]> {
    return this.http.get<EntretienClient[]>(`${this.apiServerUrl}/entretienClient/get-all-Entretiens/${entretienId}`);
  }
}
