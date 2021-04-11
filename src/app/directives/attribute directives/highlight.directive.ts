import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private eleRef: ElementRef) {
    eleRef.nativeElement.style.background = 'yellow';
  }
}
