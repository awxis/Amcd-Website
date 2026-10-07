import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Gentle fade-up when the element scrolls into view.
 * Usage: <div appReveal [revealDelay]="100">…</div>
 * Visual styles live in src/styles/_motion.scss (and respect prefers-reduced-motion).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.transition-delay.ms]': 'revealDelay()',
  },
})
export class Reveal {
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const node = this.el.nativeElement;

      if (!('IntersectionObserver' in window)) {
        node.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('is-visible');
              observer.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );

      observer.observe(node);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
