import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  constructor(private el: ElementRef) {
  }

  @Input('appHighlight') highlightBackground: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('lightskyblue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
