import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  company,
  contact,
  findService,
  footer,
  isPlaceholder,
  navLinks,
  serviceMenu,
} from '../../data/site-content';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly company = company;
  protected readonly contact = contact;
  protected readonly footer = footer;
  protected readonly links = navLinks;
  protected readonly services = serviceMenu.map((slug) => findService(slug)).filter((s) => !!s);
  protected readonly year = new Date().getFullYear();

  protected readonly hasEmail = !isPlaceholder(contact.email);
  protected readonly hasPhone = !isPlaceholder(contact.phone) && !!contact.phoneHref;
}
