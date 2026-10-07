# AMCD Website — Phase 1

Marketing website for **Akhuwat Management Consultancy Dubai L.L.C F-Z (AMCD)**.
Phase 1 contains:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services overview (all service cards) |
| `/contact` | Contact details, enquiry form, map. `/contact?service=tax` pre-selects a service |
| `/services/:slug` | Single service page, e.g. `/services/tax`. Each offering has an anchor, e.g. `/services/tax#transfer-pricing` |

The header **Services** item opens a dropdown on hover/keyboard focus: categories on the left, the hovered
category's sub-services on the right. Clicking a category opens its service page; clicking a sub-service
opens the page and scrolls to that offering. On mobile the same menu appears as an accordion in the hamburger panel.

Built with Angular 21 (standalone components, signals, zoneless), SCSS and no UI libraries.

## Setup

Requirements: Node.js 20.19+ or 22.12+ (or 24+) and npm.

```bash
npm install
npm start            # = ng serve → http://localhost:4200
npm run build        # production build → dist/amcd-website/browser
```

If port 4200 is busy: `npx ng serve --port 4300`.

## Logo

Place the logo at:

```
public/images/amcd-logo.png
```

It is served as `/images/amcd-logo.png`. (This project uses Angular's newer `public/` folder; there is no `src/assets`.)

- Use a **tightly cropped PNG with a transparent background** (no extra whitespace around it).
- Recommended size: about **600 px wide**. Much larger files trigger Angular's
  "oversized image" console warning (NG0913).
- If the new file's proportions differ, update `company.logo.width` / `height` in
  `src/app/data/site-content.ts` (used only to reserve space and avoid layout shift. The logo is never stretched).
- The footer shows the same logo on a white badge, so no separate light version is needed.

A cropped version of the supplied logo is already in place; replace it with your master file when ready.

## Editing content

All text lives in **`src/app/data/site-content.ts`**: company details, contact info, navigation,
SEO titles/descriptions, home page sections, every service and its offerings, and footer settings.
Anything beginning with `TODO:` is placeholder content.

- **Contact details:** fill in `contact.email`, `contact.phone`, `contact.phoneHref` (e.g. `+9714xxxxxxx`)
  and `contact.address`. Email/phone become clickable links automatically once the TODO text is replaced.
- **Stats strip:** fill in `homePage.stats.items` and set `enabled: true`.
- **Photos:** put images in `public/images/` and set `homePage.about.imageSrc` (e.g. `'/images/about.jpg'`)
  or `homePage.hero.backgroundImage`. A maroon overlay is applied to the hero photo automatically.
- **Social links:** add entries to `footer.social`.
- **Contact form:** set `contactPage.form.endpoint` to a form service URL (e.g. Formspree/Getform) or your own API;
  the form POSTs JSON (`name, email, phone, company, service, message`). Until then it opens the visitor's
  email app (once `contact.email` is set), or shows a "not connected" notice.
- **Map:** set `contactPage.map.embedUrl` to a Google Maps embed URL.
- **Hero photo:** `public/images/hero-meeting-room.webp` — "Modern meeting room with city view" by Marc Wieland
  on Unsplash (free Unsplash License). Swap it via `homePage.hero.backgroundImage`; a maroon overlay is applied automatically.
- **About photo:** `public/images/about-dubai.webp` — "Burj Khalifa skyline in Dubai" by Fabien Bellanger on Unsplash
  (free Unsplash License). Swap it via `homePage.about.imageSrc` (a team / office photo would be ideal).
- **Services dropdown:** the categories and their order come from `serviceMenu`. Sub-items are each service's
  `offerings`; an offering with `link: '<slug>'` points to that service's own page instead of an anchor.

## Theme

The whole look is controlled from `src/styles/`:

| File | Purpose |
| --- | --- |
| `_variables.scss` | CSS custom properties: colours, fonts, fluid type scale, 8px spacing, radii, shadows, motion |
| `_mixins.scss` | Breakpoints, hexagon clip-path, hexagon background pattern (no CSS output) |
| `_base.scss` | Reset, focus styles, smooth scrolling, reduced-motion handling |
| `_typography.scss` | Headings, eyebrow labels, animated links |
| `_buttons.scss` | `.btn--primary`, `.btn--secondary`, `.btn--light`, `.btn--outline-light` |
| `_layout.scss` | Container, sections (white / tint / dark), grids, hexagon bullet lists |
| `_cards.scss` | Card base with hover lift and maroon top border |
| `_motion.scss` | Scroll fade-up (`appReveal` directive) |

Change `--color-primary` etc. in `_variables.scss` to restyle the site.

## Project structure

```
src/
├── index.html                 Google Fonts, default meta, favicon
├── styles.scss                Imports the theme partials
├── styles/                    Theme partials (see above)
└── app/
    ├── app.ts / app.config.ts / app.routes.ts
    ├── core/                  seo.ts (Title/Meta), scroll-manager.ts (anchor + page-top scrolling)
    ├── directives/            reveal.ts (fade-up on scroll)
    ├── data/                  site-content.ts (ALL editable content)
    ├── components/
    │   ├── header/            Sticky header, mobile hamburger menu
    │   ├── footer/            Contact details, links, copyright (anchor: #contact)
    │   ├── service-card/      Card with hexagon icon
    │   ├── hex-icon/          Icon inside brand hexagon
    │   ├── icon/              Inline SVG icon set
    │   ├── section-heading/   Eyebrow + H2 + intro
    │   ├── page-banner/       Inner page banner (H1)
    │   ├── cta-banner/        Maroon call-to-action band
    │   ├── hex-cluster/       Decorative 7-hexagon logo motif (hero)
    │   └── image-placeholder/ Marked image placeholder / image
    └── pages/
        ├── home/
        ├── contact/           /contact (form + details)
        ├── services/          Overview grid
        └── service-detail/    /services/:slug
public/
├── favicon.svg
└── images/amcd-logo.png
```

## Notes

- All "Contact Us" buttons open `/contact`; service pages pass `?service=<slug>` to pre-select the service.
- Animations are disabled automatically when the user's system has *reduce motion* turned on.
