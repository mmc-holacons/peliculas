import { Injectable, signal } from '@angular/core';
import { ToastType } from '../models/toast-type.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = signal('');
  type = signal<ToastType>(ToastType.Info);
  visible = signal(false);

  showToast(message: string, type: ToastType = ToastType.Info) {
    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(() => {
      this.visible.set(false);
    }, 3500);
  }

  hide() {
    this.visible.set(false);
  }
}
