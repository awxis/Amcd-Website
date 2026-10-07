import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Seo } from '../../core/seo';
import {
  company,
  contact,
  contactPage,
  findService,
  isPlaceholder,
  services,
} from '../../data/site-content';
import { Reveal } from '../../directives/reveal';
import { HexIcon } from '../../components/hex-icon/hex-icon';
import { Icon } from '../../components/icon/icon';
import { ImagePlaceholder } from '../../components/image-placeholder/image-placeholder';
import { PageBanner } from '../../components/page-banner/page-banner';

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error' | 'not-connected';

const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/;

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, Reveal, HexIcon, Icon, ImagePlaceholder, PageBanner],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  /** Optional ?service=<slug> pre-selects a service (e.g. from a service page CTA). */
  readonly service = input<string>();

  protected readonly content = contactPage;
  protected readonly contact = contact;
  protected readonly services = services;

  protected readonly hasEmail = !isPlaceholder(contact.email);
  protected readonly hasPhone = !isPlaceholder(contact.phone) && !!contact.phoneHref;

  protected readonly status = signal<Status>('idle');
  protected readonly submitted = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly mapUrl = computed(() =>
    contactPage.map.embedUrl
      ? this.sanitizer.bypassSecurityTrustResourceUrl(contactPage.map.embedUrl)
      : null,
  );

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(PHONE_PATTERN)]],
    company: ['', [Validators.maxLength(120)]],
    service: [''],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    website: [''], // honeypot — real visitors never see or fill this
  });

  constructor() {
    inject(Seo).update(contactPage.seo);

    effect(() => {
      const slug = this.service();
      if (findService(slug)) this.form.controls.service.setValue(slug!);
    });
  }

  /** Show a field's error once it has been touched or the form was submitted. */
  protected invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted());
  }

  protected async submit(): Promise<void> {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.host.nativeElement
        .querySelector<HTMLElement>('form .ng-invalid:not(form)')
        ?.focus();
      return;
    }

    // Silently drop bot submissions.
    if (this.form.controls.website.value) {
      this.status.set('success');
      return;
    }

    const { website, ...data } = this.form.getRawValue();
    const serviceTitle = findService(data.service)?.title ?? contactPage.form.generalEnquiry;

    if (contactPage.form.endpoint) {
      this.status.set('sending');
      try {
        const response = await fetch(contactPage.form.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, service: serviceTitle, _subject: `Website enquiry – ${serviceTitle}` }),
        });
        this.status.set(response.ok ? 'success' : 'error');
        if (response.ok) this.reset();
      } catch {
        this.status.set('error');
      }
      return;
    }

    if (this.hasEmail) {
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone && `Phone: ${data.phone}`,
        data.company && `Company: ${data.company}`,
        `Service: ${serviceTitle}`,
        '',
        data.message,
      ]
        .filter((line) => line !== '' && line !== undefined)
        .join('\n');
      const subject = `Website enquiry – ${serviceTitle} – ${company.shortName}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      this.status.set('mailto');
      return;
    }

    this.status.set('not-connected');
  }

  protected startOver(): void {
    this.reset();
    this.status.set('idle');
  }

  private reset(): void {
    this.form.reset();
    this.submitted.set(false);
  }
}
