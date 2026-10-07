import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import {
  company,
  findService,
  navLinks,
  serviceMenu,
  slugify,
} from '../../data/site-content';
import { Icon } from '../icon/icon';

interface MenuItem {
  label: string;
  link: string[];
  fragment?: string;
}

interface MenuCategory {
  slug: string;
  label: string;
  link: string[];
  items: MenuItem[];
}

/** Builds the Services dropdown from site-content (categories → offerings). */
const buildServicesMenu = (): MenuCategory[] =>
  serviceMenu
    .map((slug) => findService(slug))
    .filter((s) => !!s)
    .map((service) => ({
      slug: service.slug,
      label: service.title,
      link: ['/services', service.slug],
      items: service.offerings.map((o) =>
        o.link
          ? { label: o.title, link: ['/services', o.link] }
          : { label: o.title, link: ['/services', service.slug], fragment: slugify(o.title) },
      ),
    }));

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '[class.menu-open]': 'menuOpen()',
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeAll()',
  },
})
export class Header {
  protected readonly company = company;
  protected readonly links = navLinks;
  protected readonly servicesMenu = buildServicesMenu();

  protected readonly scrolled = signal(false);
  /** Mobile hamburger panel. */
  protected readonly menuOpen = signal(false);

  // Desktop dropdown
  protected readonly dropdownOpen = signal(false);
  protected readonly activeCategory = signal<string>(this.servicesMenu[0]?.slug ?? '');
  private closeTimer: ReturnType<typeof setTimeout> | undefined;

  // Mobile accordion
  protected readonly mobileServicesOpen = signal(false);
  protected readonly mobileCategory = signal<string | null>(null);

  constructor() {
    const router = inject(Router);
    const sub = router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.closeAll());
    inject(DestroyRef).onDestroy(() => {
      sub.unsubscribe();
      clearTimeout(this.closeTimer);
    });
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeAll(): void {
    this.menuOpen.set(false);
    this.closeDropdown();
    this.mobileServicesOpen.set(false);
    this.mobileCategory.set(null);
  }

  // ---- Desktop dropdown (hover + keyboard focus) ---------------------------

  protected openDropdown(): void {
    clearTimeout(this.closeTimer);
    this.dropdownOpen.set(true);
  }

  /** Small delay so moving the pointer between panels doesn't flicker the menu closed. */
  protected scheduleClose(): void {
    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => this.closeDropdown(), 180);
  }

  protected closeDropdown(): void {
    clearTimeout(this.closeTimer);
    this.dropdownOpen.set(false);
    this.activeCategory.set(this.servicesMenu[0]?.slug ?? '');
  }

  protected onFocusOut(event: FocusEvent, container: HTMLElement): void {
    if (!container.contains(event.relatedTarget as Node | null)) this.closeDropdown();
  }

  protected setActiveCategory(slug: string): void {
    this.activeCategory.set(slug);
  }

  // ---- Mobile accordion ------------------------------------------------------

  protected toggleMobileServices(): void {
    this.mobileServicesOpen.update((open) => !open);
  }

  protected toggleMobileCategory(slug: string): void {
    this.mobileCategory.update((current) => (current === slug ? null : slug));
  }
}
