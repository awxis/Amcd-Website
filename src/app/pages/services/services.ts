import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Seo } from '../../core/seo';
import { seo, services, servicesPage } from '../../data/site-content';
import { Reveal } from '../../directives/reveal';
import { CtaBanner } from '../../components/cta-banner/cta-banner';
import { PageBanner } from '../../components/page-banner/page-banner';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { ServiceCard } from '../../components/service-card/service-card';

@Component({
  selector: 'app-services-page',
  imports: [Reveal, CtaBanner, PageBanner, SectionHeading, ServiceCard],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPage {
  protected readonly content = servicesPage;
  protected readonly services = services;

  constructor() {
    inject(Seo).update(seo.services);
  }
}
