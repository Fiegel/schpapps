import { AuthService } from 'src/app/core/home/auth/auth.service';

import {
  Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-error-modal-signin',
  templateUrl: './error-modal-signin.component.html',
  styleUrls: ['./error-modal-signin.component.scss']
})
export class ErrorModalSigninComponent implements OnChanges {
  @ViewChild('errorModalSignin') errorModal: ElementRef;

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
    this.authService.dismissErrorSignin();
  }
}
