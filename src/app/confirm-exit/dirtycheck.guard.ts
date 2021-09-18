import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { DialogService } from '../_services/dialog-service/dialog.service';
import { ComponentCanDeactivate } from './component-can-deactivate';

@Injectable({
  providedIn: 'root'
})
export class DirtycheckGuard implements CanDeactivate<ComponentCanDeactivate> {
  
  constructor(
    private dialogService: DialogService
  ) { }
  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      // the resolve / reject functions control the fate of the promise
      if (component.canDeactivate()) {
        return true;
      } else {
        this.dialogService.openConfirmDialog("You have unsaved changes in your form, Do you want to go that page?")
          .afterClosed().subscribe(res => {
            if (res) {
              resolve(true);
            }
          });

      }
    });


  }

}

