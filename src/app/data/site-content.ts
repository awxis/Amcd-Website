// ==========================================================================
// AMCD site content
// Edit text here — components read everything from this file.
// Anything starting with "TODO:" is placeholder content that still needs
// to be supplied (see README.md for the full list).
// ==========================================================================

export type IconName =
  | 'shield-check'
  | 'calculator'
  | 'percent'
  | 'users'
  | 'lightbulb'
  | 'layers'
  | 'user-search'
  | 'globe'
  | 'target'
  | 'briefcase'
  | 'award'
  | 'sliders'
  | 'message'
  | 'arrow-right'
  | 'menu'
  | 'close'
  | 'mail'
  | 'phone'
  | 'map-pin'
  | 'clock'
  | 'check'
  | 'image'
  | 'building'
  | 'package'
  | 'chevron-right'
  | 'chevron-down';

export interface LinkTarget {
  label: string;
  path: string;
  fragment?: string;
  queryParams?: Record<string, string>;
}

export interface ServiceOffering {
  title: string;
  description: string;
  items?: string[];
  /** Slug of another service that covers this offering in full (menu + "learn more" link go there). */
  link?: string;
}

export interface Service {
  slug: string; // also used as the in-page anchor on /services
  title: string;
  icon: IconName;
  tagline: string;
  summary: string; // short description used on cards
  overview: string[];
  offerings: ServiceOffering[];
}

export interface Feature {
  icon: IconName;
  title: string;
  text: string;
}

/** URL-safe anchor id, e.g. "Payroll Services" → "payroll-services". */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** True for values that are still placeholders. */
export const isPlaceholder = (value: string | undefined | null): boolean =>
  !value || value.trim().toUpperCase().startsWith('TODO');

// --------------------------------------------------------------------------
// Company
// --------------------------------------------------------------------------

export const company = {
  name: 'Akhuwat Management Consultancy Dubai L.L.C F-Z',
  shortName: 'AMCD',
  description:
    'A Dubai-based management consultancy providing assurance, accounting, tax, consulting and resourcing services to businesses across the United Arab Emirates.',
  logo: {
    // Place the logo at public/images/amcd-logo.png (served as /images/amcd-logo.png)
    src: '/images/amcd-logo.png',
    width: 600,
    height: 183,
    alt: 'AMCD – Akhuwat Management Consultancy Dubai L.L.C F-Z',
  },
};

export const contact = {
  heading: 'Get in touch',
  intro:
    'Tell us what you need and the right specialist will get back to you, usually within one business day.',
  email: 'TODO: email address',
  phone: 'TODO: phone number',
  /** Phone in international format for the tel: link, e.g. +97140000000 */
  phoneHref: '',
  address: ['TODO: office address', 'Dubai, United Arab Emirates'],
  hours: 'TODO: office hours (e.g. Mon – Fri, 8:30 AM – 6:30 PM)',
};

export const navLinks: LinkTarget[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
];

// --------------------------------------------------------------------------
// SEO (per route)
// --------------------------------------------------------------------------

export const seo = {
  home: {
    title: 'AMCD | Management Consultancy in Dubai, UAE',
    description:
      'Akhuwat Management Consultancy Dubai (AMCD) offers assurance, accounting, tax, consulting and resourcing services to help UAE businesses operate with clarity and grow with confidence.',
  },
  services: {
    title: 'Our Services | AMCD – Management Consultancy Dubai',
    description:
      'Explore AMCD services in Dubai: assurance, accounting, UAE Corporate Tax and VAT, consulting, resourcing, business process outsourcing, talent acquisition and remote workforce solutions.',
  },
};

// --------------------------------------------------------------------------
// Services
// --------------------------------------------------------------------------

export const services: Service[] = [
  {
    slug: 'assurance',
    title: 'Assurance',
    icon: 'shield-check',
    tagline: 'Independent financial assurance that lets you act with confidence.',
    summary:
      'Rigorous, objective assurance that goes beyond the audit to strengthen controls, reduce risk and build trust in your numbers.',
    overview: [
      'Our assurance work goes further than a traditional audit. We deliver practical insight that strengthens internal controls and reduces risk, giving you and your stakeholders confidence in your financial statements, operations and compliance.',
      'Whether you are meeting statutory obligations, assessing enterprise risk or refining processes, we work alongside your team — adding value to governance and performance without pulling your people away from the work that matters most.',
    ],
    offerings: [
      {
        title: 'Agreed-Upon Procedures',
        description:
          'Focused, factual engagements built around exactly what you need checked — balance confirmations, transaction testing or control walkthroughs — performed to your agreed scope under international standards (ISA / AICPA). You receive a clear report of findings, ideal for due diligence, loan covenants, royalty reviews, regulatory submissions or internal sign-offs.',
      },
      {
        title: 'Statutory & External Audit Support',
        description:
          'Full statutory audits in line with IFRS and local requirements, including UAE Federal Tax Authority (FTA) obligations, plus hands-on support for external audits through well-organised PBC lists, walkthroughs and data rooms. We manage complex areas such as consolidations, provisions and disclosures to keep timelines short and stakeholders satisfied.',
      },
    ],
  },
  {
    slug: 'accounting',
    title: 'Accounting',
    icon: 'calculator',
    tagline: 'Accurate financial records for informed decisions and efficient operations.',
    summary:
      'Reliable bookkeeping, payroll, reporting and system setup that keep your finances accurate, current and decision-ready.',
    overview: [
      'Accounting is one area no business can afford to get wrong. Our accountants keep your records accurate and up to date, so management, investors and other stakeholders can rely on them for day-to-day operations and strategic decisions.',
    ],
    offerings: [
      {
        title: 'Accounting & Bookkeeping',
        description:
          'We take the complexity of day-to-day accounting off your hands, keeping your books and cash flows current in line with international standards — and acting as a trusted sounding board for sound financial decisions.',
      },
      {
        title: 'Payroll Services',
        description:
          'Accurate, on-time payroll for teams of any size, processed weekly, fortnightly or monthly, so your people are always paid correctly.',
      },
      {
        title: 'Accounting Software Setup',
        description:
          'We assess your needs, recommend the right accounting platform and manage implementation from start to finish, then train your team so they can use it with confidence.',
      },
      {
        title: 'Financial Statement Preparation & Review',
        description:
          'Accurate, compliant financial statements prepared and reviewed under IFRS, giving you a transparent view of your financial health and insights you can act on.',
      },
      {
        title: 'Management Reporting',
        description:
          'Clear, tailored reports that turn complex data into meaningful analysis, highlighting the metrics and trends that support planning and growth.',
      },
    ],
  },
  {
    slug: 'tax',
    title: 'Tax',
    icon: 'percent',
    tagline: 'Integrated tax services that manage liabilities, ensure compliance and support growth.',
    summary:
      'UAE Corporate Tax, VAT and transfer pricing support that keeps you compliant while reducing unnecessary tax exposure.',
    overview: [
      "We provide specialist tax services tailored to the UAE's evolving landscape, including the Corporate Tax regime — helping businesses stay compliant, plan strategically and optimise their tax position across federal and emirate-level requirements.",
      'From Corporate Tax registration and VAT returns to transfer pricing policies, we offer end-to-end support aligned with Federal Tax Authority (FTA) guidance, giving you the benefit of an expert tax function without the cost of building one in-house.',
    ],
    offerings: [
      {
        title: 'Corporate Tax',
        description:
          'With UAE Corporate Tax in force at 9% (0% for qualifying free zone persons), we cover registration, tax computations, return filing, advance pricing agreements and FTA audits — as well as qualifying free zone assessments, loss carry-forwards and nexus rules.',
      },
      {
        title: 'Transfer Pricing',
        description:
          "Master files, local files and country-by-country reports prepared in line with OECD guidelines and FTA requirements, supported by benchmarking studies and functional analyses that demonstrate arm's-length pricing for intra-group transactions.",
      },
      {
        title: 'Value Added Tax (VAT)',
        description:
          'End-to-end VAT compliance at the 5% standard rate, including registrations, returns, reconciliations, partial exemption calculations, reverse charge, import VAT recovery, group registrations and FTA audit support.',
      },
    ],
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    icon: 'lightbulb',
    tagline: 'Strategic advice across finance, operations, risk and people to drive sustainable growth.',
    summary:
      'Strategy, transactions, risk, technology and corporate services advice that turns complex challenges into clear, actionable plans.',
    overview: [
      'We help organisations cut through complexity, seize opportunities and grow sustainably. Our consultants combine sector experience with practical insight to support better decisions across every part of your business.',
      'From strategy and transactions to risk and transformation, we work side by side with your team to solve problems and build resilient, future-ready organisations — with recommendations that are actionable, not just theoretical.',
    ],
    offerings: [
      {
        title: 'Business Advisory',
        description:
          'Forward-looking strategy shaped with your leadership team and carried through to execution, so it delivers measurable results.',
        items: [
          'Business strategy development',
          'Operational excellence',
          'Business transformation',
          'Performance improvement',
        ],
      },
      {
        title: 'Forensic Investigations',
        description:
          'Discreet, thorough work to detect, investigate and prevent financial misconduct, with findings that stand up for legal, regulatory and internal purposes.',
        items: [
          'Fact finding',
          'Fraud risk assessment',
          'Forensic investigations',
          'Anti-money laundering (AML)',
        ],
      },
      {
        title: 'Transaction Advisory',
        description:
          'Structured, insight-led support for acquisitions, divestments and expansions, helping you maximise value and manage risk at every stage.',
        items: [
          'Valuation & financial modelling',
          'Feasibility studies & market research',
          'Real estate highest and best use (HBU)',
          'Business plans',
          'IPO readiness',
        ],
      },
      {
        title: 'Risk Advisory',
        description:
          'Risk management frameworks that go beyond compliance — identifying vulnerabilities early and embedding practical controls that protect your operations.',
        items: [
          'Internal audit',
          'Enterprise risk management (ERM)',
          'Environmental, social & governance (ESG)',
          'Procurement review',
          'Business continuity planning',
          'Corporate governance',
          'Policy & procedure development',
          'Regulatory compliance',
        ],
      },
      {
        title: 'Financial Accounting & Advisory Services (FAAS)',
        description:
          'Support for CFOs and finance teams facing complex accounting questions, new standards and rising reporting demands.',
        items: ['IFRS consultations', 'Actuarial valuations', 'Finance transformation'],
      },
      {
        title: 'Corporate Finance',
        description:
          'Hands-on advice on deals and capital structure that aligns your financial strategy with your wider business goals.',
        items: [
          'Mergers & acquisitions',
          'Buy-side advisory',
          'Sell-side advisory',
          'Debt financing',
          'Equity financing',
        ],
      },
      {
        title: 'Corporate Services',
        link: 'corporate-services',
        description:
          'Guidance through the regulatory side of running a company, from choosing the right legal structure to approvals and ongoing compliance.',
        items: ['Company formation', 'Company structuring', 'PRO services', 'Liquidation'],
      },
      {
        title: 'Technology Advisory',
        description:
          'Technology strategy and implementation that connect your systems to your business goals, built for scale and security.',
        items: [
          'Digital transformation',
          'ERP implementation',
          'Cyber security',
          'Data protection',
        ],
      },
      {
        title: 'Learning & Development',
        description:
          'Practical training programmes that build technical and leadership capability your team can apply straight away.',
        items: ['IFRS training', 'Leadership training', 'Soft skills training'],
      },
    ],
  },
  {
    slug: 'resourcing',
    title: 'Resourcing',
    icon: 'users',
    tagline: 'The right expertise in place, exactly when you need it.',
    summary:
      'Flexible staffing, secondments and outsourcing that give you the talent you need without long-term overheads.',
    overview: [
      'Our resourcing solutions help businesses adapt, scale and perform by putting the right people and capabilities in place exactly when they are needed.',
      'Whether you are managing growth, streamlining operations or closing a skills gap, we combine industry knowledge with a hands-on approach to build high-performing teams without the burden of long-term overheads.',
    ],
    offerings: [
      {
        title: 'Business Process Outsourcing (BPO)',
        link: 'business-process-outsourcing',
        description:
          'Hand routine, resource-heavy processes — finance, administration or operational support — to experienced professionals who run them as an extension of your business, with strong governance and quality control.',
      },
      {
        title: 'Talent Acquisition',
        link: 'talent-acquisition',
        description:
          'A structured, end-to-end hiring approach, from defining roles to sourcing, screening and onboarding, focused on candidates who match both your technical needs and your culture.',
      },
      {
        title: 'On-site & Off-site Secondments',
        description:
          'Skilled professionals placed with your team for short-term projects or longer-term operational support, contributing from day one without the commitment of permanent hiring.',
      },
      {
        title: 'C-Level Support Services',
        description:
          'Experienced professionals who support your executives on financial oversight, operations and strategic initiatives, strengthening leadership capacity and decision-making.',
      },
      {
        title: 'Remote Work Solutions',
        link: 'remote-workforce-solutions',
        description:
          'Setup and ongoing support for the tools, systems and workflows that keep remote teams productive, connected and secure.',
      },
      {
        title: 'Recruitment Process Outsourcing (RPO)',
        description:
          'A dedicated team that manages your complete hiring lifecycle with consistency, using data-driven methods that reduce internal workload and improve candidate quality.',
      },
      {
        title: 'End-to-End Outsourcing',
        description:
          'HR administration, staffing, payroll, visa processing, PRO services and back-office operations managed under one integrated, compliant framework.',
      },
    ],
  },
  {
    slug: 'corporate-services',
    title: 'Corporate Services',
    icon: 'building',
    tagline: 'Company setup, licensing and governance support for doing business in the UAE.',
    summary:
      'UAE company formation, PRO, Golden Visa, banking and trademark support — so you can focus on launching and growing your business.',
    overview: [
      'We take the complexity out of setting up in the UAE — from choosing the right jurisdiction to securing your trade licence, visas and corporate bank account.',
      'Our team handles the legal documentation, government approvals and compliance requirements on your behalf, so you can concentrate on entering the market and building your brand.',
    ],
    offerings: [
      {
        title: 'Company Formation',
        description:
          'Establish your UAE company quickly and confidently, with every step from jurisdiction selection to licensing, visas and banking managed for you.',
        items: [
          'Mainland, free zone and offshore setup options',
          '100% foreign ownership in free zones and eligible mainland activities',
          'A dedicated manager to guide setup and compliance',
          'VAT and Corporate Tax registration guidance',
        ],
      },
      {
        title: 'Company Liquidation',
        description:
          'Close your UAE business in an orderly, compliant way that protects your reputation and leaves no loose ends.',
        items: [
          'Final audits, tax clearance and settlement of liabilities',
          'Visa and employee cancellations',
          'Trade licence and bank account cancellation',
          'Mainland and free zone liquidations',
        ],
      },
      {
        title: 'PRO Services',
        description:
          'A dedicated PRO team that manages government paperwork, so you never miss a deadline or incur penalties.',
        items: [
          'Visa processing, renewals and cancellations',
          'Trade licence registration and renewals',
          'Labour contracts, MOHRE approvals and settlements',
          'Translation, notarisation and attestation',
        ],
      },
      {
        title: 'Golden Visa Services',
        description:
          'Expert guidance on securing 10-year UAE residency for investors, entrepreneurs, professionals and property owners.',
        items: [
          'Eligibility assessment and application strategy',
          'End-to-end documentation, filing and approvals',
          'Sponsorship of spouse, children and dependants',
          'Ongoing support for renewals and compliance',
        ],
      },
      {
        title: 'Bank Account Opening Assistance',
        description:
          'Faster, smoother account approval with the bank best suited to your business profile.',
        items: [
          'Bank selection — conventional, Islamic or digital',
          'Business profile preparation to meet AML / CDD requirements',
          'Multi-bank applications to reduce delays',
          'Direct liaison with relationship managers',
        ],
      },
      {
        title: 'Trademark Registration',
        description: 'Protect your brand name, logo and product identity across the UAE and GCC.',
        items: [
          'Eligibility checks, searches and clearance',
          'Application filing and tracking through to certificate',
          'Renewals, licensing and brand monitoring',
          'Advice on disputes and regional expansion',
        ],
      },
    ],
  },
  {
    slug: 'fixed-asset-inventory-management',
    title: 'Fixed Asset & Inventory Management',
    icon: 'package',
    tagline: 'Verification, tagging and reconciliation that keep your asset register audit-ready.',
    summary:
      'Accurate fixed asset registers and inventory controls that improve compliance, reduce losses and support better decisions.',
    overview: [
      'We help businesses keep their fixed assets and inventory accurate, compliant and efficient throughout their lifecycle — with precise tracking, valuation and optimisation that reduce risk and support better decisions.',
      'Whether you need to build a reliable asset register, resolve discrepancies or streamline warehouse operations, we apply proven practices and modern tools to cut costs and strengthen controls, without the need for specialist in-house resources.',
    ],
    offerings: [
      {
        title: 'Fixed Asset Management',
        description:
          'End-to-end support across the asset lifecycle — from register setup and verification to disposal and automation — giving you accurate reporting and real-time visibility.',
        items: [
          'Asset register setup and clean-up',
          'Physical tagging and verification',
          'Capitalisation and componentisation reviews',
          'Depreciation policy and calculation',
          'Impairment testing',
          'Disposal and retirement accounting',
          'Lease accounting under IFRS 16',
          'General ledger to register reconciliations',
          'ERP integration (e.g. SAP, Oracle)',
        ],
      },
      {
        title: 'Inventory Management',
        description:
          'Inventory planning and controls that improve stock accuracy, reduce waste and strengthen supply-chain reliability.',
        items: [
          'Count planning and supervision',
          'Physical stock counts and cycle counts',
          'Reconciliation and variance analysis',
          'Valuation (FIFO, weighted average, NRV testing)',
          'Slow-moving and obsolete stock analysis',
          'Costing system reviews',
          'Warehouse process optimisation',
          'Inventory controls and SOP development',
          'Shrinkage and loss investigations',
          'ERP / inventory system implementation',
        ],
      },
    ],
  },
  {
    slug: 'business-process-outsourcing',
    title: 'Business Process Outsourcing (BPO)',
    icon: 'layers',
    tagline: 'Delegate non-core functions to a team that runs them to your standards.',
    summary:
      'Industry-specific outsourcing for finance, customer support and back-office work, so you can scale faster and focus on your core business.',
    overview: [
      'Lower costs and improve efficiency by outsourcing non-core functions while keeping full control over quality. We provide industry-specific teams — from finance specialists to customer support and back-office professionals — that help you scale faster and operate smarter.',
    ],
    offerings: [
      {
        title: 'Property Management',
        description:
          'Accounting, lease administration, tenant communication and maintenance coordination handled end to end.',
      },
      {
        title: 'Financial Services & Accounting Firms',
        description:
          'Remote bookkeepers, tax professionals and compliance specialists supporting audit, financial reporting and regulatory work.',
      },
      {
        title: 'E-Commerce & Retail',
        description:
          'Order processing, inventory management, product listings, customer support and real-time financial reporting.',
      },
      {
        title: 'Technology & SaaS',
        description:
          'Customer success, IT support, software testing, data processing and back-end support teams.',
      },
      {
        title: 'Call Centres & Customer Support',
        description:
          'Multilingual agents providing 24/7 inbound and outbound calls, live chat and email support.',
      },
      {
        title: 'Healthcare & Medical Billing',
        description:
          'Claims processing, medical transcription and patient data management that reduce paperwork and support compliance.',
      },
      {
        title: 'Marketing & Creative Agencies',
        description:
          'Social media managers, content writers, graphic designers and digital marketers who help you deliver campaigns at scale.',
      },
    ],
  },
  {
    slug: 'talent-acquisition',
    title: 'Talent Acquisition',
    icon: 'user-search',
    tagline: 'Your recruitment partner, from first hires to the C-suite.',
    summary:
      'Executive search, permanent and contract staffing, and volume hiring that connect you with people who fit your business.',
    overview: [
      'Hiring well is about more than filling vacancies — it is about securing people who move your business forward. Acting as your dedicated off-site recruitment partner, we connect you with high-calibre candidates across industries, from junior staff to senior executives.',
    ],
    offerings: [
      {
        title: 'Executive Search & Leadership Hiring',
        description:
          'Sourcing C-suite executives, senior managers and leaders with the vision to navigate challenges and drive growth.',
      },
      {
        title: 'Permanent & Contract Staffing',
        description:
          'Full-time employees or project-based talent, thoroughly screened to match your requirements.',
      },
      {
        title: 'Industry-Specific Recruitment',
        description:
          'Specialist recruiters who understand the hiring nuances of sectors such as finance, technology, healthcare and engineering.',
      },
      {
        title: 'End-to-End Recruitment Support',
        description:
          'Job profiling, sourcing, interviews, assessments and onboarding managed in one streamlined process.',
      },
      {
        title: 'Employer Branding & Talent Strategy',
        description:
          'Sharper hiring strategies, compelling job descriptions and a stronger employer brand that attract and retain top talent.',
      },
      {
        title: 'Bulk & Volume Hiring',
        description:
          'Scale your workforce quickly without compromising on quality, with everything from screening to onboarding handled for you.',
      },
      {
        title: 'Remote & Global Hiring',
        description:
          'Access talent beyond borders by sourcing and hiring remote professionals and international candidates.',
      },
    ],
  },
  {
    slug: 'remote-workforce-solutions',
    title: 'Remote Workforce Solutions',
    icon: 'globe',
    tagline: 'Dedicated remote professionals — you direct the work, we handle the rest.',
    summary:
      'Dedicated remote professionals on a secondment model, with payroll, compliance and IT infrastructure managed for you.',
    overview: [
      'Access skilled talent without the overheads. Through a secondment model, we provide dedicated remote professionals while managing payroll, administration and infrastructure on your behalf — for short-term specialist needs or long-term dedicated roles.',
    ],
    offerings: [
      {
        title: 'Dedicated Remote Professionals',
        description:
          'Skilled seconded professionals who work exclusively for your business, giving you flexibility without the operational burden.',
      },
      {
        title: 'Payroll & Compliance Management',
        description:
          'Salary processing, tax compliance and benefits administration handled in full, keeping your remote team compliant and engaged.',
      },
      {
        title: 'IT & Infrastructure Support',
        description:
          'Secure digital workspaces, software setup and cyber security measures that keep remote operations running smoothly.',
      },
      {
        title: 'On-Demand Workforce Scaling',
        description:
          'Grow or reduce your team as your needs change, with short-term specialists or long-term remote staff.',
      },
      {
        title: 'Performance Management & Reporting',
        description:
          'Structured performance tracking, regular reporting, KPIs and a dedicated account manager.',
      },
      {
        title: 'Seamless Onboarding & Integration',
        description:
          'Complete onboarding — from communication channels to cultural alignment — so new team members integrate quickly.',
      },
    ],
  },
];

/**
 * Services shown in the header "Services" dropdown (in this order).
 * BPO, Talent Acquisition and Remote Workforce Solutions appear as
 * sub-items under Resourcing (via each offering's `link`).
 */
export const serviceMenu: string[] = [
  'assurance',
  'accounting',
  'tax',
  'resourcing',
  'consulting',
  'corporate-services',
  'fixed-asset-inventory-management',
];

export const findService = (slug: string | undefined | null): Service | undefined =>
  services.find((s) => s.slug === slug);

// --------------------------------------------------------------------------
// Home page
// --------------------------------------------------------------------------

export const homePage = {
  hero: {
    eyebrow: 'Management Consultancy · Dubai, UAE',
    title: 'Clear insight for confident business decisions.',
    subtitle:
      'From assurance and tax to consulting and resourcing, Akhuwat Management Consultancy Dubai partners with organisations across the UAE to strengthen their finances, operations and teams.',
    primaryCta: { label: 'Our Services', path: '/services' } as LinkTarget,
    secondaryCta: { label: 'Contact Us', path: '/contact' } as LinkTarget,
    /**
     * Background photo behind a maroon overlay. Leave empty to use the plain brand gradient.
     * Current photo: "Modern meeting room with city view" by Marc Wieland on Unsplash (free Unsplash License).
     * Replace with a photo of the AMCD office when available.
     */
    backgroundImage: '/images/hero-meeting-room.webp',
  },

  about: {
    eyebrow: 'About AMCD',
    title: 'A Dubai consultancy built around how your business works',
    paragraphs: [
      'Akhuwat Management Consultancy Dubai L.L.C F-Z (AMCD) is a management consultancy based in Dubai, United Arab Emirates. We help organisations bring structure to their finances, stay compliant with UAE regulations and build teams that can deliver on their ambitions.',
      'Our services span assurance, accounting, tax, consulting and resourcing — delivered by one accountable team that takes the time to understand your operations before recommending a way forward.',
      'TODO: content needed — founding year, team size, licensing authority / free zone and mission statement.',
    ],
    highlights: [
      'Assurance, accounting & tax',
      'Strategic & financial consulting',
      'Resourcing & outsourcing',
      'UAE regulatory know-how',
    ],
    imageLabel: 'Image placeholder: AMCD team or Dubai office photo',
    /**
     * Current photo: "Burj Khalifa skyline in Dubai" by Fabien Bellanger on Unsplash (free Unsplash License).
     * Replace with a photo of the AMCD team / office when available, e.g. '/images/about.jpg'.
     */
    imageSrc: '/images/about-dubai.webp',
    imageAlt: 'Downtown Dubai skyline with the Burj Khalifa at twilight',
  },

  servicesPreview: {
    eyebrow: 'Our Services',
    title: 'Expertise across every part of your business',
    intro:
      'Specialist services across every major business need, coordinated by a single team that takes responsibility for your results.',
    featuredSlugs: [
      'assurance',
      'accounting',
      'tax',
      'consulting',
      'resourcing',
      'business-process-outsourcing',
    ],
    cta: { label: 'View All Services', path: '/services' } as LinkTarget,
  },

  whyChooseUs: {
    eyebrow: 'Why choose us',
    title: 'A partner you can rely on',
    intro:
      'Seasoned professionals and tailored solutions designed to move your business forward.',
    points: [
      {
        icon: 'target',
        title: 'One accountable team',
        text: 'A single, coordinated team owns your engagement from start to finish, so you always know who is responsible for delivery.',
      },
      {
        icon: 'briefcase',
        title: 'Sector specialists',
        text: 'Our advisers understand the realities of your industry, from your first audit through to expansion across borders.',
      },
      {
        icon: 'award',
        title: 'Seasoned professionals',
        text: 'Experienced practitioners bring rigour, insight and reliability to every assignment, whatever its size.',
      },
      {
        icon: 'sliders',
        title: 'Tailored solutions',
        text: 'Every engagement is shaped around your goals, structure and budget — never a one-size-fits-all package.',
      },
      {
        icon: 'shield-check',
        title: 'UAE regulatory know-how',
        text: 'We keep you aligned with UAE requirements, including Corporate Tax, VAT and free zone rules, as regulations evolve.',
      },
      {
        icon: 'message',
        title: 'Responsive support',
        text: 'Reach out and the right specialist will get back to you, usually within one business day.',
      },
    ] as Feature[],
  },

  // Key figures. Hidden until real AMCD numbers are supplied — fill in the
  // values and set `enabled: true` to show the stats strip on the home page.
  stats: {
    enabled: false,
    items: [
      { value: 'TODO', label: 'Years of experience' },
      { value: 'TODO', label: 'Clients served' },
      { value: 'TODO', label: 'Industries served' },
      { value: 'TODO', label: 'Team members' },
    ],
  },

  cta: {
    title: "Let's build what's next, together",
    text: 'Whatever stage your business is at, our specialists are ready to help with practical, tailored advice.',
    button: { label: 'Contact Us', path: '/contact' } as LinkTarget,
  },
};

// --------------------------------------------------------------------------
// Services page
// --------------------------------------------------------------------------

export const servicesPage = {
  banner: {
    eyebrow: 'What we do',
    title: 'Our Services',
    intro:
      'Assurance, accounting, tax, consulting and resourcing services that help Dubai businesses operate with clarity, stay compliant and grow with confidence.',
  },
  grid: {
    eyebrow: 'Service overview',
    title: 'Every practice area, one trusted partner',
    intro: 'Select a service to see everything it includes.',
  },
  offeringsLabel: "What's included",
  detail: {
    backLabel: 'All services',
    learnMoreLabel: 'Learn more',
    otherServicesEyebrow: 'Keep exploring',
    otherServicesTitle: 'Our other services',
  },
  cta: {
    title: 'Not sure which service you need?',
    text: 'Tell us about your challenge and we will recommend the right next step — no obligation and no generic proposal.',
    button: { label: 'Contact Us', path: '/contact' } as LinkTarget,
  },
};

// --------------------------------------------------------------------------
// Contact page
// --------------------------------------------------------------------------

export const contactPage = {
  seo: {
    title: 'Contact Us | AMCD – Management Consultancy Dubai',
    description:
      'Get in touch with Akhuwat Management Consultancy Dubai (AMCD). Tell us about your business and the right specialist will get back to you, usually within one business day.',
  },
  banner: {
    eyebrow: 'Contact us',
    title: "Let's talk about your business",
    intro:
      'Whether you need help with assurance, tax, accounting, consulting or resourcing, our team is ready to listen and recommend the right next step.',
  },
  details: {
    eyebrow: 'Get in touch',
    title: 'Contact details',
    intro: 'Reach us directly, or send a message using the form and we will get back to you.',
    labels: { email: 'Email', phone: 'Phone', address: 'Office', hours: 'Office hours' },
  },
  form: {
    title: 'Send us a message',
    intro: 'Fields marked * are required.',
    /**
     * Where the form is sent (JSON POST), e.g. a Formspree / Getform URL or your own API.
     * TODO: set this. While empty, the form opens the visitor's email app instead
     * (once `contact.email` is filled in).
     */
    endpoint: '',
    labels: {
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      company: 'Company',
      service: 'Service of interest',
      message: 'How can we help?',
    },
    placeholders: {
      name: 'Your full name',
      email: 'name@company.com',
      phone: '+971 5X XXX XXXX',
      company: 'Company name (optional)',
      message: 'Tell us a little about your business and what you need help with.',
    },
    generalEnquiry: 'General enquiry',
    submitLabel: 'Send message',
    sendingLabel: 'Sending…',
    errors: {
      required: 'This field is required.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      messageLength: 'Please write at least 10 characters.',
      summary: 'Please correct the highlighted fields.',
    },
    success: {
      title: 'Thank you — your message has been sent.',
      text: 'One of our specialists will be in touch shortly, usually within one business day.',
      again: 'Send another message',
    },
    mailtoOpened: {
      title: 'Your email app has been opened.',
      text: 'Please press send in your email app to complete your message.',
    },
    failure:
      'Sorry, something went wrong while sending your message. Please try again, or contact us directly by email or phone.',
    notConnected:
      'TODO: the contact form is not connected yet — add a form endpoint or the company email address in site-content.ts.',
  },
  map: {
    label: 'Map placeholder: AMCD office location in Dubai',
    /**
     * Google Maps embed URL.
     * TODO: DUMMY location (Business Bay, Dubai) — replace with the real office once confirmed.
     * Either use Google Maps → Share → "Embed a map" src, or the simple form below with the address.
     */
    embedUrl: 'https://maps.google.com/maps?q=Business%20Bay%2C%20Dubai%2C%20United%20Arab%20Emirates&z=14&output=embed',
  },
};

// --------------------------------------------------------------------------
// Footer
// --------------------------------------------------------------------------

export const footer = {
  quickLinksHeading: 'Quick links',
  servicesHeading: 'Services',
  /** Social profiles, e.g. { label: 'LinkedIn', url: 'https://…' } — TODO: add when available. */
  social: [] as { label: string; url: string }[],
};
