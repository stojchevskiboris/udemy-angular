import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }
    isOpen = false


    @HostListener('click') toggleOpen() {
        if (!this.isOpen) {
            this.renderer.addClass(this.elRef.nativeElement, 'open')
            this.isOpen = true
        } else{
            this.renderer.removeClass(this.elRef.nativeElement, 'open')
            this.isOpen = false
        }
    }

}