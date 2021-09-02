import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class notificationsService {

  constructor(private notificationsService: NotificationsService) { }
  public onSuccess(message){
    this.notificationsService.success('Succès', message, {
      possition: ['bottom', 'right'],
      timeOut: 2000,
      animate:'fade',
      showProgressBar: true,
      pauseOnHover: true
    });
  }
  public onError(message){
    this.notificationsService.error('Erreur', message, {
      possition: ['bottom', 'right'],
      timeOut: 2000,
      animate:'fade',
      showProgressBar: true,
      pauseOnHover: true
    });
  }
}
