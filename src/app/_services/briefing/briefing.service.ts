import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Briefing } from './briefing';

@Injectable({
  providedIn: 'root'
})
export class BriefingService {
  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient){}

  public getBriefings(): Observable<Briefing[]> {
    return this.http.get<Briefing[]>(`${this.apiServerUrl}/Briefing/get-all-Briefings`);
  }

  public addBriefing(briefing: Briefing, id: number): Observable<Briefing> {
    return this.http.post<Briefing>(`${this.apiServerUrl}/Briefing/ajouterBriefing/${id}`, briefing);
  }

  public updateBriefing(briefing: Briefing): Observable<Briefing> {
    return this.http.put<Briefing>(`${this.apiServerUrl}/Briefing/modifyidBriefing`, briefing);
  }
  
  public deleteBriefing(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Briefing/deleteC/${id}`);
  }

  public getBriefing(id : number): Observable<Briefing> {
    return this.http.get<Briefing>(`${this.apiServerUrl}/Briefing/find/${id}`);
  }

  public getBriefingByConsultantId(id : number): Observable<Briefing[]> {
    return this.http.get<Briefing[]>(`${this.apiServerUrl}/Briefing/getBriefingsByConsId/${id}`);
  }
}
