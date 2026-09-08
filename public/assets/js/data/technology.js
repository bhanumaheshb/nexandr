/* ==========================================================================
   NEXANDR — technology ecosystem (Technology page).
   ========================================================================== */

window.NEXANDR_TECHNOLOGY = {
  layers: [
    {
      id: 'ai-ml',
      name: 'AI / ML',
      icon: 'solar:cpu-bolt-line-duotone',
      role: 'Intelligence layer',
      text: 'Model training, retrieval and reasoning — the components that turn data into judgement.',
      items: [
        { name: 'Python',        note: 'Primary language across research and production' },
        { name: 'PyTorch',       note: 'Model training and fine-tuning' },
        { name: 'Hugging Face',  note: 'Model hub, tokenizers, inference' },
        { name: 'LLMs',          note: 'Hosted and self-hosted large language models' },
        { name: 'RAG',           note: 'Grounded retrieval over private knowledge' },
        { name: 'AI Agents',     note: 'Tool-using, durable autonomous workflows' },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'solar:server-square-line-duotone',
      role: 'Application core',
      text: 'Typed services, transactional storage and the APIs everything else is built against.',
      items: [
        { name: 'Python',      note: 'Shared language with the AI layer' },
        { name: 'FastAPI',     note: 'Typed, async service APIs' },
        { name: 'Django',      note: 'Data-heavy platforms and admin surfaces' },
        { name: 'PostgreSQL',  note: 'System of record, relational and vector' },
        { name: 'Redis',       note: 'Caching, queues and ephemeral state' },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend',
      icon: 'solar:window-frame-line-duotone',
      role: 'Product surface',
      text: 'Interfaces that make complex systems legible — fast, accessible and typed end to end.',
      items: [
        { name: 'React',      note: 'Component architecture' },
        { name: 'Next.js',    note: 'Rendering, routing and performance' },
        { name: 'TypeScript', note: 'Contracts shared with the backend' },
        { name: 'Tailwind',   note: 'Design-system-driven styling' },
      ],
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: 'solar:cloud-storage-line-duotone',
      role: 'Runtime foundation',
      text: 'Reproducible environments, automated delivery and the observability to operate them.',
      items: [
        { name: 'Docker', note: 'Identical environments everywhere' },
        { name: 'Cloud',  note: 'Managed and private deployment targets' },
        { name: 'CI/CD',  note: 'Tested, gated, repeatable releases' },
        { name: 'Linux',  note: 'The substrate under all of it' },
      ],
    },
  ],

  principles: [
    { title: 'Boring where it counts', text: 'Proven components in the load-bearing positions. Novelty is spent where it creates advantage, not everywhere.' },
    { title: 'Typed end to end', text: 'Contracts between layers are explicit, so change is safe and refactors are mechanical.' },
    { title: 'Measured, not assumed', text: 'Evaluation, tests and observability are part of the architecture, not added afterwards.' },
    { title: 'Portable by default', text: 'Containerised and infrastructure-as-code, so the platform is not hostage to one vendor.' },
  ],
};
