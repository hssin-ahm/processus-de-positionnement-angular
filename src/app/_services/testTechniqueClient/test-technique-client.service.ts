import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestTechniqueClient } from './testTechniqueClient';

@Injectable({
  providedIn: 'root'
})
export class TestTechniqueClientService {

  
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getPositionnements(): Observable<TestTechniqueClient[]> {
    return this.http.get<TestTechniqueClient[]>(`${this.apiServerUrl}/testTechniqueClient/get-all-testTechniqueClients`);
  }

  public addTestTechniqueClient(testTechniqueClient: TestTechniqueClient, id: Number): Observable<TestTechniqueClient> {
    return this.http.post<TestTechniqueClient>(`${this.apiServerUrl}/testTechniqueClient/ajouterTestTechniqueClient/${id}`, testTechniqueClient);
  }
  public addPositionnemen(testTechniqueClient: TestTechniqueClient): Observable<TestTechniqueClient> {
    return this.http.post<TestTechniqueClient>(`${this.apiServerUrl}/testTechniqueClient/ajoutertestTechniqueClient`, testTechniqueClient);
  }
  public updateTestTechniqueClient(testTechniqueClient: TestTechniqueClient): Observable<TestTechniqueClient> {
    return this.http.put<TestTechniqueClient>(`${this.apiServerUrl}/testTechniqueClient/modifyidTestTechniqueClient`, testTechniqueClient);
  }
  
  public deleteTestTechniqueClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/testTechniqueClient/deleteT/${id}`);
  }

  public getTestTechniqueClient(id : number): Observable<TestTechniqueClient> {
    return this.http.get<TestTechniqueClient>(`${this.apiServerUrl}/testTechniqueClient/find/${id}`);
  }
  public findByKeyword(key: string): Observable<TestTechniqueClient[]> {
    return this.http.get<TestTechniqueClient[]>(`${this.apiServerUrl}/testTechniqueClient/findBy/${key}`);
  }
  public getTestTechniqueClientsByConsId(id: number): Observable<TestTechniqueClient[]> {
    return this.http.get<TestTechniqueClient[]>(`${this.apiServerUrl}/testTechniqueClient/get-all-TestTechniqueClients/${id}`);
  }
}
