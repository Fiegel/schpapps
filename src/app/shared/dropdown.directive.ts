import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private isShow = false;
  private dropdownParentEl = this.elementRef.nativeElement.closest('.dropdown');

  constructor(private elementRef: ElementRef) { }

  @HostListener('click') toggleOpen() {
    this.isShow = !this.isShow;
    this.dropdownParentEl.querySelector('.dropdown-menu').classList.toggle('show');
  }
}
