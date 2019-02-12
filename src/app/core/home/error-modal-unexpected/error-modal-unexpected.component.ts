import { AuthService } from 'src/app/core/home/auth/auth.service';

import {
  Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-error-modal-unexpected',
  templateUrl: './error-modal-unexpected.component.html',
  styleUrls: ['./error-modal-unexpected.component.scss']
})
export class ErrorModalUnexpectedComponent implements OnChanges {
  @ViewChild('errorModalUnexpected') errorModal: ElementRef;

  @Input() show: boolean;

  constructor(private renderer: Renderer2,
    private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.show) {
      if (this.show) {
        this.renderer.addClass(this.errorModal.nativeElement, 'in');
        this.renderer.addClass(this.errorModal.nativeElement, 'show');
        this.renderer.setStyle(this.errorModal.nativeElement, 'display', 'block');
      } else {
        this.renderer.removeClass(this.errorModal.nativeElement, 'in');
        this.renderer.removeClass(this.errorModal.nativeElement, 'show');
        this.renderer.setStyle(this.errorModal.nativeElement, 'display', 'none');
      }
    }
  }

  onModalClose() {
    this.authService.dismissErrorUnexpected();
  }
}
