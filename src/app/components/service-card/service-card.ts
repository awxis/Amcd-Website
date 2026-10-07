import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../../data/site-content';
import { HexIcon } from '../hex-icon/hex-icon';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink, HexIcon, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card service-card" [class.is-compact]="compact()">
      <app-hex-icon [name]="service().icon" />
      <h3 class="service-card__title">{{ service().title }}</h3>
      <p class="service-card__text">{{ service().summary }}</p>
      <a class="link service-card__link" [routerLink]="['/services', service().slug]">
        {{ linkLabel() }}
        <span class="visually-hidden">about {{ service().title }}</span>
        <app-icon name="arrow-right" />
      </a>
    </article>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    app-hex-icon {
      margin-bottom: var(--space-3);
    }
    @media (min-width: 1200px) {
      .is-compact {
        padding: var(--space-3);
      }
    }
    .service-card__title {
      margin-bottom: var(--space-1);
    }
    .service-card__text {
      flex: 1;
      color: var(--color-text-muted);
      margin-bottom: var(--space-3);
    }
    .service-card__link {
      align-self: flex-start;
      app-icon {
        width: 1.1em;
        height: 1.1em;
        transition: transform var(--transition-fast);
      }
      &:hover app-icon {
        transform: translateX(4px);
      }
    }
    /* Make the whole card clickable while keeping a single, accessible link. */
    .service-card__link::after {
      content: '';
      position: absolute;
      inset: 0;
    }
  `,
})
export class ServiceCard {
  readonly service = input.required<Service>();
  readonly linkLabel = input('Learn more');
  /** Tighter padding for dense (4-column) grids. */
  readonly compact = input(false, { transform: booleanAttribute });
}
