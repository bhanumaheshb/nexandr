/* ==========================================================================
   NEXANDR — product catalogue.
   This file is the single source of truth for the Products index AND every
   product detail page. To add a product:
     1. Append an entry below.
     2. Copy any product-*.html file, change <title>/meta and PRODUCT_SLUG.
     3. Add the page to sitemap.xml and to site.js -> footer.columns.
   ========================================================================== */

window.NEXANDR_PRODUCTS = [
  {
    slug: 'nexandr-ai',
    name: 'NEXANDR AI',
    category: 'AI Platform',
    status: 'In Development',
    icon: 'solar:cpu-bolt-line-duotone',
    short: 'AI intelligence and automation platform.',
    summary:
      'A unified platform for building, deploying and operating AI capability inside a business — models, retrieval, evaluation and automation in one governed environment.',
    overview:
      'NEXANDR AI is the foundation layer of our product line. It gives an organisation a single place to connect its knowledge, run models against it, and put the result into production workflows — without stitching together a dozen disconnected tools.',
    problem: [
      'AI capability is scattered across notebooks, vendors and one-off scripts with no shared governance.',
      'Teams cannot measure whether an AI feature is actually accurate, safe or improving.',
      'Moving a working prototype into a production workflow takes months.',
    ],
    solution: [
      'One control plane for models, prompts, retrieval sources and automations.',
      'Built-in evaluation so every change is measured before it ships.',
      'Deployment paths from prototype to production without a rewrite.',
    ],
    features: [
      { title: 'Model orchestration', text: 'Route work across hosted and self-hosted models with fallback, cost and latency policies.' },
      { title: 'Knowledge & retrieval', text: 'Connect documents and systems of record into governed, permission-aware retrieval.' },
      { title: 'Evaluation harness', text: 'Regression suites, scoring and human review built into the release path.' },
      { title: 'Workflow automation', text: 'Trigger AI steps from real business events and write results back to source systems.' },
      { title: 'Observability', text: 'Traces, cost attribution and quality metrics for every call in production.' },
      { title: 'Governance', text: 'Access control, redaction, audit trails and per-team usage boundaries.' },
    ],
    architecture: [
      { layer: 'Interface', text: 'Web console, SDK and REST API for application teams.' },
      { layer: 'Orchestration', text: 'Task routing, prompt/version registry, guardrails and evaluation.' },
      { layer: 'Intelligence', text: 'LLMs, embeddings, classical ML services and vector retrieval.' },
      { layer: 'Data', text: 'Connectors, ingestion pipelines, permissioned index and audit store.' },
      { layer: 'Runtime', text: 'Containerised services on cloud or private infrastructure.' },
    ],
    useCases: [
      'Internal knowledge assistants over policy, product and engineering documentation.',
      'Document-heavy operations: intake, extraction, classification and routing.',
      'Customer support augmentation with grounded, auditable answers.',
      'Analyst copilots that read internal data and draft decisions for review.',
    ],
  },
  {
    slug: 'nexandr-agents',
    name: 'NEXANDR Agents',
    category: 'Agent Infrastructure',
    status: 'In Development',
    icon: 'solar:widget-5-line-duotone',
    short: 'AI agent infrastructure for business workflows.',
    summary:
      'Infrastructure for running reliable, tool-using AI agents against real business systems — with the state management, permissions and observability production work demands.',
    overview:
      'Agents fail in production for operational reasons, not intellectual ones: no durable state, no permission model, no visibility into what happened. NEXANDR Agents supplies that missing substrate so an agent can be trusted with real work.',
    problem: [
      'Demo agents break the moment they touch real systems, real permissions and real failure modes.',
      'There is no record of what an agent did, why, or with whose authority.',
      'Long-running or multi-step work has nowhere to keep durable state.',
    ],
    solution: [
      'Durable execution: agent runs survive restarts, retries and human handoff.',
      'A typed tool layer with scoped credentials and per-action approval gates.',
      'Full traces of reasoning, tool calls and outcomes for audit and debugging.',
    ],
    features: [
      { title: 'Durable runs', text: 'Checkpointed execution with replay, resume and timeout handling.' },
      { title: 'Tool registry', text: 'Typed, versioned tools with scoped credentials and rate limits.' },
      { title: 'Human-in-the-loop', text: 'Approval gates on any action classified as sensitive or irreversible.' },
      { title: 'Multi-agent topologies', text: 'Supervisor and specialist patterns with explicit hand-off contracts.' },
      { title: 'Memory', text: 'Short-term working context plus governed long-term memory per workspace.' },
      { title: 'Full-run tracing', text: 'Step-level traces with cost, latency and outcome labelling.' },
    ],
    architecture: [
      { layer: 'Interface', text: 'Agent definitions as code, plus a run console for operators.' },
      { layer: 'Scheduler', text: 'Durable workflow engine with checkpointing and retry policy.' },
      { layer: 'Reasoning', text: 'LLM planning loop with structured output and guardrails.' },
      { layer: 'Tools', text: 'Typed connectors to internal APIs, databases and SaaS platforms.' },
      { layer: 'Governance', text: 'Credential broker, approval service and immutable audit log.' },
    ],
    useCases: [
      'Back-office operations: reconciliation, data entry and exception handling.',
      'Sales and CRM hygiene with agents that update records from real activity.',
      'Engineering support: triage, diagnostics and first-pass remediation.',
      'Procurement and compliance checks across multiple internal systems.',
    ],
  },
  {
    slug: 'nexandr-vision',
    name: 'NEXANDR Vision',
    category: 'Computer Vision',
    status: 'Early Access',
    icon: 'solar:eye-scan-line-duotone',
    short: 'Computer vision and visual intelligence platform.',
    summary:
      'A platform for turning camera and sensor streams into reliable operational signal — detection, inspection and monitoring that runs at the edge and reports to the centre.',
    overview:
      'NEXANDR Vision covers the full path from raw video to decision: labelling and model training, edge deployment on constrained hardware, and a central layer that turns detections into alerts, metrics and audit evidence.',
    problem: [
      'Camera infrastructure exists but produces footage nobody reviews.',
      'Vision pilots stall between a working model and reliable field deployment.',
      'Edge devices are hard to update, monitor and keep accurate over time.',
    ],
    solution: [
      'Dataset, labelling and training workflow tuned for operational vision problems.',
      'Edge runtime that runs optimised models on modest hardware, offline-tolerant.',
      'Central console for fleet health, drift detection and event review.',
    ],
    features: [
      { title: 'Detection & tracking', text: 'Object, defect and activity detection with multi-object tracking.' },
      { title: 'Edge runtime', text: 'Quantised models on GPU, NPU or CPU targets with offline buffering.' },
      { title: 'Fleet management', text: 'Remote deployment, versioning and health monitoring across sites.' },
      { title: 'Drift monitoring', text: 'Accuracy tracking against sampled ground truth with retraining triggers.' },
      { title: 'Event pipeline', text: 'Rules that convert detections into alerts, tickets and dashboards.' },
      { title: 'Evidence store', text: 'Clip retention and review workflow for audit and dispute resolution.' },
    ],
    architecture: [
      { layer: 'Capture', text: 'IP cameras, industrial sensors and robotic platforms.' },
      { layer: 'Edge', text: 'Inference runtime, buffering and local rules on site hardware.' },
      { layer: 'Transport', text: 'Event streaming with store-and-forward for unreliable links.' },
      { layer: 'Platform', text: 'Model registry, training pipeline, fleet control and analytics.' },
      { layer: 'Interface', text: 'Operator console, alerting integrations and reporting API.' },
    ],
    useCases: [
      'Manufacturing quality inspection and defect classification.',
      'Workplace safety monitoring and zone compliance.',
      'Logistics: pallet, package and vehicle recognition across yards.',
      'Retail and facility analytics from existing camera estates.',
    ],
  },
  {
    slug: 'nexandr-data',
    name: 'NEXANDR Data',
    category: 'Data Platform',
    status: 'Concept',
    icon: 'solar:database-line-duotone',
    short: 'Intelligent data and analytics platform.',
    summary:
      'A data platform built for the AI era — pipelines, modelling, quality and semantics in one place, so both people and models query the same trusted definitions.',
    overview:
      'Most AI programmes are limited by data, not models. NEXANDR Data provides the ingestion, transformation, quality and semantic layers that make organisational data dependable enough for automated decisions.',
    problem: [
      'Metrics disagree between teams because definitions live in dashboards, not in the platform.',
      'Pipelines break silently and nobody learns until a report looks wrong.',
      'AI systems are pointed at raw tables with no semantics, and hallucinate structure.',
    ],
    solution: [
      'Declarative pipelines with lineage from source system to served metric.',
      'Quality tests and freshness contracts enforced before data is published.',
      'A semantic layer that serves the same definitions to BI tools and to AI agents.',
    ],
    features: [
      { title: 'Ingestion', text: 'Batch and streaming connectors for databases, SaaS and event sources.' },
      { title: 'Transformation', text: 'Versioned, tested transformations with full column-level lineage.' },
      { title: 'Quality contracts', text: 'Freshness, volume, schema and distribution tests that gate publication.' },
      { title: 'Semantic layer', text: 'Governed metric and entity definitions consumed by BI and by agents.' },
      { title: 'Analytics & BI', text: 'Exploration, scheduled reporting and embedded analytics.' },
      { title: 'Predictive services', text: 'Forecasting and scoring models served alongside the metrics they use.' },
    ],
    architecture: [
      { layer: 'Sources', text: 'Operational databases, SaaS APIs, events and files.' },
      { layer: 'Ingestion', text: 'Managed connectors with change-data-capture and replay.' },
      { layer: 'Storage', text: 'Lakehouse tables with bronze, silver and gold zones.' },
      { layer: 'Semantics', text: 'Metric layer, entity model, access policy and lineage graph.' },
      { layer: 'Serving', text: 'SQL, API and agent interfaces over the same definitions.' },
    ],
    useCases: [
      'Executive and operational reporting on a single agreed metric layer.',
      'Grounding AI assistants in governed business data rather than raw tables.',
      'Forecasting demand, churn and capacity from unified historical data.',
      'Migrating fragmented reporting estates onto one maintained platform.',
    ],
  },
];
