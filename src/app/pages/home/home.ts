import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { homePage, seo, services } from '../../data/site-content';
import { Reveal } from '../../directives/reveal';
import { CtaBanner } from '../../components/cta-banner/cta-banner';
import { HexCluster } from '../../components/hex-cluster/hex-cluster';
import { HexIcon } from '../../components/hex-icon/hex-icon';
import { Icon } from '../../components/icon/icon';
import { ImagePlaceholder } from '../../components/image-placeholder/image-placeholder';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { ServiceCard } from '../../components/service-card/service-card';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    Reveal,
    CtaBanner,
    HexCluster,
    HexIcon,
    Icon,
    ImagePlaceholder,
    SectionHeading,
    ServiceCard,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly content = homePage;
  protected readonly featuredServices = homePage.servicesPreview.featuredSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s) => !!s);

  constructor() {
    inject(Seo).update(seo.home);
  }
}
