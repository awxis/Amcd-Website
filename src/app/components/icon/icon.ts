import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconName } from '../../data/site-content';

/** Lightweight inline stroke icons (24×24 grid). Each icon is a list of path `d` strings. */
const ICONS: Record<IconName, string[]> = {
  'shield-check': ['M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z', 'M9 12l2 2 4-4'],
  calculator: [
    'M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
    'M8.5 7h7',
    'M8.5 11h.01',
    'M12 11h.01',
    'M15.5 11h.01',
    'M8.5 14.5h.01',
    'M12 14.5h.01',
    'M8.5 18h.01',
    'M12 18h.01',
    'M15.5 14.5V18',
  ],
  percent: [
    'M19 5L5 19',
    'M4 6.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0',
    'M15 17.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0',
  ],
  users: [
    'M5.5 8a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0',
    'M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1',
    'M16 4.6a3.5 3.5 0 0 1 0 6.8',
    'M18.5 14.2a5 5 0 0 1 3 4.6V20',
  ],
  lightbulb: [
    'M9 18h6',
    'M10 21h4',
    'M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z',
  ],
  layers: ['M12 2.5l9 5-9 5-9-5 9-5z', 'M3 12l9 5 9-5', 'M3 16.5l9 5 9-5'],
  'user-search': [
    'M6 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
    'M3 21v-1.5A5.5 5.5 0 0 1 8.5 14h3',
    'M14 17a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
    'M19.2 19.2l2.3 2.3',
  ],
  globe: [
    'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0',
    'M3 12h18',
    'M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z',
  ],
  target: [
    'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0',
    'M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0',
    'M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
  ],
  briefcase: [
    'M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z',
    'M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2',
    'M3 12.5h18',
  ],
  award: ['M6 9a6 6 0 1 0 12 0a6 6 0 1 0-12 0', 'M8.5 14l-1.5 7 5-3 5 3-1.5-7'],
  sliders: [
    'M4 6h10',
    'M18 6h2',
    'M4 12h4',
    'M12 12h8',
    'M4 18h12',
    'M14 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    'M8 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    'M16 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  ],
  message: [
    'M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'M8 9h8',
    'M8 12.5h5',
  ],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  mail: [
    'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
    'M3 7l9 6 9-6',
  ],
  phone: [
    'M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  ],
  'map-pin': [
    'M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z',
    'M9.5 9.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0',
  ],
  clock: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M12 7v5l3 2'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  building: [
    'M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16',
    'M15 9h4a1 1 0 0 1 1 1v11',
    'M3 21h18',
    'M8 8h3',
    'M8 12h3',
    'M8 16h3',
  ],
  package: ['M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z', 'M4 7.5l8 4.5 8-4.5', 'M12 12v9', 'M8 5.3l8 4.5'],
  'chevron-right': ['M9 6l6 6-6 6'],
  'chevron-down': ['M6 9l6 6 6-6'],
  image: [
    'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z',
    'M3 16l5-5 4 4 3-3 6 6',
    'M14 8.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0',
  ],
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly strokeWidth = input(1.75);
  protected readonly paths = computed(() => ICONS[this.name()] ?? []);
}
