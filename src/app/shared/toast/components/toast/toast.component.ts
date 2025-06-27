import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  toastService = inject(ToastService);

  toastMessage = computed(() => this.toastService.message());
  toastType = computed(() => this.toastService.type());
  toastVisible = computed(() => this.toastService.visible());
}
