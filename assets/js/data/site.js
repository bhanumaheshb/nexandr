/* ==========================================================================
   NEXANDR — global site configuration.
   Edit here to change branding, navigation, contact details and footer.
   ========================================================================== */

window.NEXANDR_SITE = {
  name: 'NEXANDR',
  tagline: "Building What's Next.",
  positioning: 'Next-generation technology across AI, Networks, Data & Robotics.',

  /* Swap `logo.src` for your own asset (PNG/SVG) at any time.
     Set `logo.mode` to 'image' to use a raster file instead of the inline SVG. */
  logo: {
    mode: 'svg',            // 'svg' (inline, theme-aware) | 'image'
    src: 'assets/img/nexandr-wordmark.svg',
    alt: 'NEXANDR',
  },

  contact: {
    general: 'hello@nexandr.com',
    careers: 'careers@nexandr.com',
    location: 'Global · Remote-first',
  },

  nav: [
    { label: 'Solutions',  href: 'solutions.html',  key: 'solutions' },
    { label: 'Products',   href: 'products.html',   key: 'products' },
    { label: 'Technology', href: 'technology.html', key: 'technology' },
    { label: 'About',      href: 'about.html',      key: 'about' },
    { label: 'Careers',    href: 'careers.html',    key: 'careers' },
  ],

  cta: { label: "Let's Talk", href: 'contact.html' },

  footer: {
    statement: 'NEXANDR builds next-generation technology across AI, Networks, Data and Robotics — as products of our own, and as engineering partners to the businesses we work with.',
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'About',    href: 'about.html' },
          { label: 'Careers',  href: 'careers.html' },
          { label: 'Contact',  href: 'contact.html' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'AI & Machine Learning', href: 'solutions.html#ai-machine-learning' },
          { label: 'Software Engineering',  href: 'solutions.html#software-engineering' },
          { label: 'Data & Analytics',      href: 'solutions.html#data-analytics' },
          { label: 'Cloud & Infrastructure',href: 'solutions.html#cloud-infrastructure' },
          { label: 'Robotics & Automation', href: 'solutions.html#robotics-automation' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'NEXANDR AI',     href: 'product-nexandr-ai.html' },
          { label: 'NEXANDR Agents', href: 'product-nexandr-agents.html' },
          { label: 'NEXANDR Vision', href: 'product-nexandr-vision.html' },
          { label: 'NEXANDR Data',   href: 'product-nexandr-data.html' },
        ],
      },
    ],
    social: [
      { label: 'LinkedIn', href: '#', icon: 'ri:linkedin-fill' },
      { label: 'X',        href: '#', icon: 'ri:twitter-x-fill' },
      { label: 'GitHub',   href: '#', icon: 'ri:github-fill' },
    ],
  },

  /* Four core technology domains — used on the home page. */
  capabilities: [
    {
      key: 'ai',
      name: 'AI',
      icon: 'solar:cpu-bolt-line-duotone',
      description: 'Artificial Intelligence, Machine Learning, Generative AI and intelligent agents.',
      points: ['Applied ML', 'Generative AI', 'Agentic systems'],
    },
    {
      key: 'networks',
      name: 'Networks',
      icon: 'solar:transmission-line-duotone',
      description: 'Connected systems, infrastructure, distributed platforms and intelligent networking.',
      points: ['Distributed platforms', 'Infrastructure', 'Integration'],
    },
    {
      key: 'data',
      name: 'Data',
      icon: 'solar:database-line-duotone',
      description: 'Data engineering, analytics, intelligent data systems and decision platforms.',
      points: ['Pipelines', 'Analytics', 'Decision systems'],
    },
    {
      key: 'robotics',
      name: 'Robotics',
      icon: 'solar:eye-scan-line-duotone',
      description: 'Computer vision, automation, intelligent machines and robotics systems.',
      points: ['Computer vision', 'Automation', 'Edge AI'],
    },
  ],
};
