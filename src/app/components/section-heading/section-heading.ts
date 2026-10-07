import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Eyebrow label + H2 title + optional intro, used at the top of each section. */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-center]': "align() === 'center'" },
  template: `
    @if (eyebrow()) {
      <p class="eyebrow">{{ eyebrow() }}</p>
    }
    <h2 [id]="headingId() || null">{{ title() }}</h2>
    @if (intro()) {
      <p class="lead">{{ intro() }}</p>
    }
  `,
  styles: `
    :host {
      display: block;
      max-width: 720px;
      margin-bottom: var(--space-5);
    }
    :host(.is-center) {
      margin-inline: auto;
      text-align: center;
    }
    h2 {
      margin-bottom: var(--space-2);
    }
  `,
})
export class SectionHeading {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly intro = input('');
  readonly align = input<'left' | 'center'>('center');
  /** Optional id so the parent <section> can reference it via aria-labelledby. */
  readonly headingId = input('');
}
