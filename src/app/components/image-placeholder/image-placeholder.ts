import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

/**
 * Shows an image when `src` is set; otherwise a clearly marked placeholder box.
 */
@Component({
  selector: 'app-image-placeholder',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.aspect-ratio]': 'ratio()' },
  template: `
    @if (src()) {
      <img [src]="src()" [alt]="alt()" loading="lazy" />
    } @else {
      <div class="placeholder" role="img" [attr.aria-label]="label()">
        <app-icon name="image" />
        <span>{{ label() }}</span>
      </div>
    }
  `,
  styles: `
    @use 'mixins' as *;

    :host {
      display: block;
      width: 100%;
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      height: 100%;
      padding: var(--space-4);
      border: 2px dashed var(--color-primary-light);
      border-radius: inherit;
      background-color: var(--color-primary-tint);
      @include hex-pattern('%23862e31', 0.08, 72px);
      color: var(--color-primary);
      text-align: center;
      font-size: var(--fs-small);
      font-weight: var(--fw-medium);
    }
    app-icon {
      width: 40px;
      height: 40px;
    }
  `,
})
export class ImagePlaceholder {
  readonly label = input('Image placeholder');
  readonly src = input('');
  readonly alt = input('');
  readonly ratio = input('4 / 3');
}
