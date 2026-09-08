/* ==========================================================================
   NEXANDR — solution categories (Solutions page).
   Each entry renders one full section: problem, what we build,
   technology and business impact.
   ========================================================================== */

window.NEXANDR_SOLUTIONS = [
  {
    id: 'ai-machine-learning',
    index: '01',
    name: 'AI & Machine Learning',
    icon: 'solar:cpu-bolt-line-duotone',
    lead: 'Applied intelligence, engineered for production — not demos.',
    capabilities: [
      'Machine Learning systems',
      'Generative AI',
      'LLM applications',
      'AI Agents',
      'RAG systems',
      'Computer Vision',
      'AI automation',
    ],
    problem:
      'Organisations know AI matters but end up with prototypes that never survive contact with real data, real users or real compliance requirements.',
    build:
      'Production ML and generative AI systems: retrieval pipelines grounded in your own knowledge, agents that operate inside your workflows, vision models deployed to the edge, and the evaluation harness that keeps all of it honest.',
    technology: ['Python', 'PyTorch', 'Hugging Face', 'LLMs', 'RAG', 'Vector search', 'MLOps'],
    impact: [
      'Cycle times cut on document- and knowledge-heavy work',
      'Measurable accuracy instead of anecdotal confidence',
      'A path from pilot to production that does not require a rebuild',
    ],
  },
  {
    id: 'software-engineering',
    index: '02',
    name: 'Software Engineering',
    icon: 'solar:code-square-line-duotone',
    lead: 'Products and platforms built to be maintained for years.',
    capabilities: [
      'Custom software',
      'SaaS platforms',
      'Web applications',
      'Backend systems',
      'API development',
      'Full-stack engineering',
    ],
    problem:
      'Software written to hit a launch date accumulates cost quickly — brittle integrations, no tests, and an architecture that resists every change the business needs next.',
    build:
      'Full-stack product engineering: multi-tenant SaaS platforms, internal systems, APIs and the front-ends on top of them — designed, documented and tested to be extended by whichever team owns them next.',
    technology: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'React', 'Next.js', 'TypeScript'],
    impact: [
      'Faster delivery of subsequent features, not just the first release',
      'Lower defect rates through typed interfaces and automated testing',
      'Systems your own engineers can take ownership of',
    ],
  },
  {
    id: 'data-analytics',
    index: '03',
    name: 'Data & Analytics',
    icon: 'solar:chart-square-line-duotone',
    lead: 'Trusted data as the substrate for every decision and every model.',
    capabilities: [
      'Data platforms',
      'Data pipelines',
      'Analytics',
      'Business intelligence',
      'Predictive systems',
    ],
    problem:
      'Reporting disagrees between teams, pipelines fail quietly, and any AI initiative inherits every one of those problems at scale.',
    build:
      'End-to-end data platforms: ingestion and change-data-capture, tested transformations with lineage, a governed semantic layer, and the analytics and predictive services built on top of it.',
    technology: ['PostgreSQL', 'Airflow', 'dbt-style modelling', 'Spark', 'Redis', 'BI tooling'],
    impact: [
      'One agreed definition of every business-critical metric',
      'Failures caught before they reach a report or a model',
      'Forecasting and scoring grounded in data people already trust',
    ],
  },
  {
    id: 'cloud-infrastructure',
    index: '04',
    name: 'Cloud & Infrastructure',
    icon: 'solar:cloud-storage-line-duotone',
    lead: 'Infrastructure that stays boring while the product moves fast.',
    capabilities: [
      'Cloud architecture',
      'Deployment',
      'DevOps',
      'Infrastructure',
      'System integration',
    ],
    problem:
      'Deployments are manual and frightening, environments drift apart, and cost grows faster than usage because nothing is measured.',
    build:
      'Reproducible infrastructure as code, containerised services, CI/CD with real gates, observability that answers questions during an incident, and integration work that connects systems which were never designed to talk.',
    technology: ['Docker', 'Kubernetes', 'Terraform-style IaC', 'CI/CD', 'Linux', 'Cloud platforms'],
    impact: [
      'Releases become routine rather than events',
      'Recovery measured in minutes, with a known-good path back',
      'Infrastructure cost that tracks usage instead of surprising you',
    ],
  },
  {
    id: 'robotics-automation',
    index: '05',
    name: 'Robotics & Automation',
    icon: 'solar:eye-scan-line-duotone',
    lead: 'Machines that perceive their environment and act on it reliably.',
    capabilities: [
      'Computer vision',
      'Robotics software',
      'Intelligent automation',
      'Edge AI',
    ],
    problem:
      'Physical operations generate enormous signal — cameras, sensors, machine telemetry — and almost none of it reaches a decision in time to matter.',
    build:
      'Vision and sensing systems that run at the edge, robotics and control software, and the automation layer that turns detections into actions inside existing operational systems.',
    technology: ['Python', 'OpenCV', 'PyTorch', 'ROS-style control', 'Edge runtimes', 'MQTT'],
    impact: [
      'Inspection and monitoring coverage that no manual process can match',
      'Fewer defects and safety incidents reaching downstream',
      'Automation of repetitive physical-process decisions',
    ],
  },
];
