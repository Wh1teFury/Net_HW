import { Directive, HostListener, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener("click") toggleDropdown(): void {
    const buttonEl = this.elRef.nativeElement;
    const isOpen = buttonEl.classList.contains("open");

    if (isOpen) {
      this.renderer.removeClass(buttonEl, "open");
    } else {
      this.renderer.addClass(buttonEl, "open");
    }
  }
}
@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  private shadow: string = `
    0 16px 24px 2px rgba(33,37,41,.4), 
    0 6px 30px 5px rgba(33,37,41,.4),
    0 8px 10px -5px rgba(33,37,41,.4)`;

  @HostListener("mouseenter") mouseover(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, "box-shadow", this.shadow);
  }

  @HostListener("mouseleave") mouseleave(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, "box-shadow", "none");
  }
}
