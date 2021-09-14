import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CvEnvoye } from './cvEnvoye';

@Injectable({
  providedIn: 'root'
})
export class CvEnvoyeService {

  private apiServerUrl = environment.apiBaseUrl;
  public cvEnvoyes: CvEnvoye[];
  
  constructor(private http: HttpClient){}

  public getCvEnvoyes(): Observable<CvEnvoye[]> {
    return this.http.get<CvEnvoye[]>(`${this.apiServerUrl}/cvEnvoyee/get-all-cvEnvoyees`);
  }

  public addCvEnvoye(cvEnvoye: CvEnvoye, id: number): Observable<CvEnvoye> {
    return this.http.post<CvEnvoye>(`${this.apiServerUrl}/cvEnvoyee/ajouteCvEnvoyee/${id}`, cvEnvoye);
  }

  public updateCvEnvoye(cvEnvoye: CvEnvoye): Observable<CvEnvoye> {
    return this.http.put<CvEnvoye>(`${this.apiServerUrl}/cvEnvoyee/modifycv`, cvEnvoye);
  }
  
  public deleteCvEnvoye(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cvEnvoyee/deleteCv/${id}`);
  }

  public getCvEnvoye(id : number): Observable<CvEnvoye> {
    return this.http.get<CvEnvoye>(`${this.apiServerUrl}/cvEnvoyee/cvs/${id}`);
  }

  public getCvEnvoyeByConsultantId(id : number): Observable<CvEnvoye[]> {
    return this.http.get<CvEnvoye[]>(`${this.apiServerUrl}/cvEnvoyee/getCvEnvoyeesByConsId/${id}`);
  }
  
}
