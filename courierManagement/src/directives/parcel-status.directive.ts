import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParcelStatus]'
})
export class ParcelStatusDirective implements OnInit {

  @Input('appParcelStatus') status!: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.addBaseClasses();
    this.applyStatusStyle();
    this.animate();
  }

  private addBaseClasses() {
    const baseClasses = [
      'px-3',
      'py-1',
      'text-sm',
      'rounded',
      'font-semibold'
    ];

    baseClasses.forEach(cls =>
      this.renderer.addClass(this.el.nativeElement, cls)
    );
  }

  private applyStatusStyle() {
    switch (this.status) {
      case 'Pending':
        this.addClasses(['bg-gray-700', 'text-white']);
        break;

      case 'Delivered':
        this.addClasses(['bg-green-500', 'text-white']);
        break;

      case 'Cancelled':
        this.addClasses(['bg-red-500', 'text-white']);
        break;

      default:
        this.addClasses(['bg-gray-400', 'text-black']);
    }
  }

  private addClasses(classes: string[]) {
    classes.forEach(cls =>
      this.renderer.addClass(this.el.nativeElement, cls)
    );
  }

  private animate() {
    this.renderer.addClass(this.el.nativeElement, 'animate-pulse');
    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, 'animate-pulse');
    }, 800);
  }
}
