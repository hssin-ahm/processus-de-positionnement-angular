import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Validation } from './validation';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getEntretiens(): Observable<Validation[]> {
    return this.http.get<Validation[]>(`${this.apiServerUrl}/validation/get-all-validations`);
  }
  public addValidation(Validation: Validation, consultantId: number): Observable<Validation> {
    return this.http.post<Validation>(`${this.apiServerUrl}/validation/ajouterValidation/${consultantId}`, Validation);
  }
  public updateValidation(validation: Validation): Observable<Validation> {
    return this.http.put<Validation>(`${this.apiServerUrl}/validation/modifyididValidation`, validation);
  }
  public deleteValidation(validationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/validation/deleteV/${validationId}`);
  }
  public getAllValidationsByConsultantId(consultantId: number): Observable<Validation[]> {
    return this.http.get<Validation[]>(`${this.apiServerUrl}/validation/get-all-validations/${consultantId}`);
  }
  public getValidationsByCvId(cvid: number): Observable<Validation> {
    return this.http.get<Validation>(`${this.apiServerUrl}/validation/getValidationByCvId/${cvid}`);
  }
  public updateValidationCv(validation: Validation, cvId: number, consId: number): Observable<Validation> {
    return this.http.put<Validation>(`${this.apiServerUrl}/validation/modifyidValidation/${cvId}/${consId}`, validation);
  }
}
