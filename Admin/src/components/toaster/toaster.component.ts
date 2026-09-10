import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


export type ToastType = 'success' | 'error' | 'info' | 'warning';


@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {


  @Input() message: string = '';
  @Input() type: ToastType = 'info';


  visible: boolean = false;

  show(msg: string, type: ToastType = 'info', duration: number = 3000) {
    this.message = msg;
    this.type = type;
    this.visible = true;


    setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.visible = false;
  }

  get iconClass(): string {
    switch (this.type) {
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-times-circle';
      case 'warning': return 'fa-exclamation-triangle';
      default: return 'fa-info-circle';
    }
  }

}
