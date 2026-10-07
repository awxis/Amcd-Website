import { DestroyRef, Injectable, Injector, afterNextRender, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Handles scrolling after navigation:
 * - links with a fragment (e.g. /services#tax) smooth-scroll to the target and move focus to it
 * - a change of page jumps to the top
 * Smooth scrolling is skipped when the user prefers reduced motion.
 */
@Injectable({ providedIn: 'root' })
export class ScrollManager {
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private lastPath = '';

  init(destroyRef: DestroyRef): void {
    const sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const tree = this.router.parseUrl(e.urlAfterRedirects);
        const path = e.urlAfterRedirects.split(/[?#]/)[0];
        const pathChanged = path !== this.lastPath;
        this.lastPath = path;

        afterNextRender(
          () => {
            if (tree.fragment) {
              this.scrollToId(tree.fragment);
            } else if (pathChanged) {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
          },
          { injector: this.injector },
        );
      });

    destroyRef.onDestroy(() => sub.unsubscribe());
  }

  scrollToId(id: string): void {
    const target = document.getElementById(id);
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

    // Move keyboard focus to the target for screen reader / keyboard users.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}
