import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import {
  Service,
  company,
  findService,
  serviceMenu,
  servicesPage,
  slugify,
} from '../../data/site-content';
import { Reveal } from '../../directives/reveal';
import { CtaBanner } from '../../components/cta-banner/cta-banner';
import { HexIcon } from '../../components/hex-icon/hex-icon';
import { Icon } from '../../components/icon/icon';
import { PageBanner } from '../../components/page-banner/page-banner';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { ServiceCard } from '../../components/service-card/service-card';

/** Single service page: /services/:slug (each offering has an anchor, e.g. /services/tax#transfer-pricing). */
@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, Reveal, CtaBanner, HexIcon, Icon, PageBanner, SectionHeading, ServiceCard],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetail {
  /** Bound from the route parameter (withComponentInputBinding). The route guard guarantees it exists. */
  readonly slug = input.required<string>();

  protected readonly content = servicesPage;
  protected readonly slugify = slugify;

  protected readonly service = computed(() => findService(this.slug()) as Service);

  /** Other menu services, starting after the current one so each page shows a different mix. */
  protected readonly otherServices = computed(() => {
    const menu = serviceMenu.filter((s) => s !== this.slug());
    const start = Math.max(0, serviceMenu.indexOf(this.slug()));
    return [...menu.slice(start), ...menu.slice(0, start)]
      .slice(0, 3)
      .map((slug) => findService(slug))
      .filter((s) => !!s);
  });

  constructor() {
    const seo = inject(Seo);
    effect(() => {
      const service = this.service();
      seo.update({
        title: `${service.title} | ${company.shortName} – Management Consultancy Dubai`,
        description: `${service.summary} ${company.shortName}, Dubai, UAE.`,
      });
    });
  }
}
