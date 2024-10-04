import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Subject<string> = new Subject<string>();

  getNotifications() {
    return this.notifications.asObservable();
  }

  notify(message: string) {
    this.notifications.next(message);
  }
}
