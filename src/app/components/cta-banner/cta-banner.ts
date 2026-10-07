import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../directives/reveal';
import { LinkTarget } from '../../data/site-content';
import { Icon } from '../icon/icon';

/** Maroon call-to-action band with hexagon motif. */
@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink, Reveal, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta on-dark" aria-labelledby="cta-heading">
      <div class="container">
        <div class="cta__inner" appReveal>
          <div class="cta__text">
            <h2 id="cta-heading">{{ title() }}</h2>
            @if (text()) {
              <p>{{ text() }}</p>
            }
          </div>
          <a class="btn btn--light" [routerLink]="button().path" [fragment]="button().fragment" [queryParams]="button().queryParams">
            {{ button().label }}
            <app-icon name="arrow-right" />
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as *;

    :host {
      display: block;
    }
    .cta {
      position: relative;
      padding-block: var(--space-6);
      background-color: var(--color-primary);
      background-image: linear-gradient(
        120deg,
        var(--color-primary) 0%,
        var(--color-primary-dark) 55%,
        var(--color-primary-darker) 100%
      );
      color: var(--color-white);
      overflow: hidden;

      @include up(lg) {
        padding-block: var(--space-7);
      }

      /* faint hexagon pattern overlay */
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        @include hex-pattern('%23ffffff', 0.09, 96px);
        mask-image: linear-gradient(90deg, transparent 0%, #000 70%);
        pointer-events: none;
      }
    }
    .cta__inner {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-4);

      @include up(lg) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .cta__text {
      max-width: 680px;
    }
    h2 {
      color: var(--color-white);
      margin-bottom: var(--space-2);
    }
    p {
      margin: 0;
      font-size: var(--fs-lead);
      color: var(--color-text-on-dark-muted);
    }
    .btn {
      flex-shrink: 0;
    }
  `,
})
export class CtaBanner {
  readonly title = input.required<string>();
  readonly text = input('');
  readonly button = input.required<LinkTarget>();
}
