import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Inner-page banner (H1 + intro) on dark maroon with the hexagon motif. */
@Component({
  selector: 'app-page-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="banner on-dark" aria-labelledby="page-title">
      <div class="container banner__inner">
        @if (eyebrow()) {
          <p class="eyebrow">{{ eyebrow() }}</p>
        }
        <h1 id="page-title">{{ title() }}</h1>
        @if (intro()) {
          <p class="banner__intro">{{ intro() }}</p>
        }
        <ng-content />
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as *;

    :host {
      display: block;
    }
    .banner {
      position: relative;
      padding-block: var(--space-6);
      background: linear-gradient(135deg, var(--color-primary-darker) 0%, var(--color-primary-dark) 100%);
      color: var(--color-white);
      overflow: hidden;

      @include up(lg) {
        padding-block: var(--space-7);
      }

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        @include hex-pattern('%23ffffff', 0.09, 96px);
        mask-image: radial-gradient(ellipse at 85% 50%, #000 0%, transparent 70%);
        pointer-events: none;
      }
    }
    .banner__inner {
      position: relative;
    }
    .eyebrow {
      color: var(--color-accent);
    }
    h1 {
      color: var(--color-white);
      margin-bottom: var(--space-2);
    }
    .banner__intro {
      max-width: 680px;
      margin: 0;
      font-size: var(--fs-lead);
      color: var(--color-text-on-dark-muted);
    }
  `,
})
export class PageBanner {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly intro = input('');
}
