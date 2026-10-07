import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { ScrollManager } from './core/scroll-manager';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main-content" (click)="skipToMain($event)">Skip to main content</a>
    <app-header />
    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
    }
    .skip-link {
      position: absolute;
      top: var(--space-1);
      left: var(--space-1);
      z-index: 1000;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
      background: var(--color-primary);
      color: var(--color-white);
      font-weight: var(--fw-semibold);
      transform: translateY(-200%);
      transition: transform var(--transition-fast);
    }
    .skip-link:focus {
      transform: none;
    }
  `,
})
export class App {
  private readonly scroll = inject(ScrollManager);

  constructor() {
    this.scroll.init(inject(DestroyRef));
  }

  protected skipToMain(event: Event): void {
    event.preventDefault();
    this.scroll.scrollToId('main-content');
  }
}
