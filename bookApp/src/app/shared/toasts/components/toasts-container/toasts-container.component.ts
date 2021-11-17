import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
    *ngFor="let toast of toastService.toasts"
    [class]="toast.classname"
    [autohide]="true"
    [delay]="toast.delay || 5000"
    (hidden)="toastService.remove(toast)">

      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'},
  styles: [
    `:host {
      position: fixed;
      top: auto!important;
      bottom: 0!important;
      right: 0;
      margin: 0.5em;
      z-index: 1200;
    }`
  ]
})
export class ToastsContainerComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  
  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }
}
