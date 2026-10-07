import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Decorative 7-hexagon cluster echoing the AMCD logo mark.
 * Purely visual — hidden from assistive technology.
 */
@Component({
  selector: 'app-hex-cluster',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    @for (hex of hexes; track $index) {
      <span [class]="'hex hex--' + hex"></span>
    }
  `,
  styles: `
    @use 'mixins' as *;

    :host {
      --hex: 96px;
      position: relative;
      display: block;
      width: calc(var(--hex) * 3.4);
      height: calc(var(--hex) * 4);
    }
    .hex {
      position: absolute;
      left: 50%;
      top: 50%;
      width: var(--hex);
      height: calc(var(--hex) * #{$hex-ratio});
      clip-path: $hex-clip;
      background: rgba(255, 255, 255, 0.08);
      transform: translate(-50%, -50%) translate(var(--x), var(--y));
      transition: background-color var(--transition-base);
    }
    /* logo arrangement: centre, top, bottom and four diagonals */
    .hex--c  { --x: 0;                        --y: 0; background: rgba(255, 255, 255, 0.16); }
    .hex--t  { --x: 0;                        --y: calc(var(--hex) * -1.42); }
    .hex--b  { --x: 0;                        --y: calc(var(--hex) * 1.42); }
    .hex--tl { --x: calc(var(--hex) * -1.2);  --y: calc(var(--hex) * -0.71); }
    .hex--tr { --x: calc(var(--hex) * 1.2);   --y: calc(var(--hex) * -0.71); background: var(--color-accent); opacity: 0.9; }
    .hex--bl { --x: calc(var(--hex) * -1.2);  --y: calc(var(--hex) * 0.71); }
    .hex--br { --x: calc(var(--hex) * 1.2);   --y: calc(var(--hex) * 0.71); background: rgba(255, 255, 255, 0.12); }

    @media (prefers-reduced-motion: no-preference) {
      .hex {
        animation: float 7s ease-in-out infinite;
      }
      .hex--tr { animation-delay: -2s; }
      .hex--bl { animation-delay: -4s; }
      .hex--t  { animation-delay: -1s; }
      .hex--b  { animation-delay: -5s; }
    }
    @keyframes float {
      0%, 100% { transform: translate(-50%, -50%) translate(var(--x), var(--y)); }
      50%      { transform: translate(-50%, -50%) translate(var(--x), calc(var(--y) - 6px)); }
    }
  `,
})
export class HexCluster {
  protected readonly hexes = ['t', 'tl', 'tr', 'c', 'bl', 'br', 'b'];
}
