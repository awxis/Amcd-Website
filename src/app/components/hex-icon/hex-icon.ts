import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from '../../data/site-content';
import { Icon } from '../icon/icon';

/** Icon framed in the brand hexagon (light maroon tint, maroon icon). */
@Component({
  selector: 'app-hex-icon',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-large]': "size() === 'lg'" },
  template: `<app-icon [name]="name()" />`,
  styles: `
    @use 'mixins' as *;

    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      @include hexagon(64px);
      background: var(--color-primary-tint);
      color: var(--color-primary);
      transition:
        background-color var(--transition-base),
        color var(--transition-base);
    }
    :host(.is-large) {
      @include hexagon(84px);
    }
    app-icon {
      width: 28px;
      height: 28px;
    }
    :host(.is-large) app-icon {
      width: 36px;
      height: 36px;
    }
    /* invert on card hover */
    :host-context(.card:hover) {
      background: var(--color-primary);
      color: var(--color-white);
    }
  `,
})
export class HexIcon {
  readonly name = input.required<IconName>();
  readonly size = input<'md' | 'lg'>('md');
}
