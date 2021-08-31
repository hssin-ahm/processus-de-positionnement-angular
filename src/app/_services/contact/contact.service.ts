import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiServerUrl}/contact/get-all-contacts`);
  }

  public addContact(contact: Contact): Observable<Contact> {
    
    return this.http.post<Contact>(`${this.apiServerUrl}/contact/ajouterContact`, contact);
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiServerUrl}/contact/modifyidContact`, contact);
  }

  public deleteContact(contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/contact/deleteC/${contactId}`);
  }
  public addContactToCvEnvoye(contact: Contact, cvEnvoyeId: number): Observable<Contact> {
    
    return this.http.post<Contact>(`${this.apiServerUrl}/contact/addcontacttocvenv/${cvEnvoyeId}`, contact);
  }
}
