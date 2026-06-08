# Package Boundaries

---

# Overview

This document defines strict architectural boundaries between all packages in the Praxis monorepo.

The goal is to ensure a maintainable, scalable, and predictable system where each package has a clearly defined responsibility and dependency direction.

Boundaries are designed to prevent circular dependencies, reduce coupling, and enforce a clean separation between domain logic, content, persistence, and presentation layers.

---

# Core Principle

Dependencies must follow a strict directional flow.

Lower-level packages must never depend on higher-level packages.

Higher-level packages may depend on lower-level abstractions only through explicit public APIs.

---

# Dependency Direction Model

The architecture follows a layered dependency graph:

```text id="p8xq21"
apps
  ↓
ui
  ↓
core
  ↓
content / i18n
  ↓
shared
```

storage operates alongside core but remains strictly independent of UI.

services extend core without violating domain isolation.

---

# Package Responsibility Boundaries

## apps/web and apps/desktop

Applications are entry points only.

### Responsibilities

* UI composition (via SvelteKit)
* Platform integration (web or Tauri)
* Routing and navigation
* Orchestration of core services

### Restrictions

* No domain logic
* No content interpretation logic
* No direct storage access
* No business rules implementation

Applications are thin runtime shells.

---

## ui

Shared presentation layer.

### Responsibilities

* Components
* Layout systems
* Design tokens
* Visual consistency
* Accessibility primitives

### Restrictions

* No business logic
* No content interpretation
* No dependency on apps
* No direct access to storage or services

UI consumes only structured data.

---

## core

Core is the domain engine of Praxis.

### Responsibilities

* Learning progression logic
* Content interpretation layer
* Exercise orchestration logic
* Progress calculation
* State transitions
* Domain rules

### Restrictions

* Must be UI-agnostic
* Must not depend on applications
* Must not directly access filesystem or SQLite
* Must not contain presentation logic

Core is responsible for transforming content into meaningful runtime models.

---

## core/services

Application service layer within core.

### Responsibilities

* Orchestration of domain workflows
* Coordination between:

  * exercises
  * storage
  * content
* High-level use cases (e.g., "complete lesson", "unlock module")

### Restrictions

* No UI dependencies
* No direct rendering concerns
* Must remain pure orchestration layer

This layer connects domain logic without leaking infrastructure concerns.

---

## content

Educational content definition layer.

### Responsibilities

* Courses
* Modules
* Lessons
* Exercise definitions
* Metadata structure
* Content graph

### Restrictions

* No logic execution
* No dependency on core or UI
* Must remain purely declarative

Content is authored by community contributors and treated as versioned data.

---

## i18n

Localization layer for Praxis.

### Responsibilities

* Language definitions
* Translation mappings
* Locale resolution
* Fallback handling

### Restrictions

* No structural content definition
* No domain logic
* No UI logic

i18n only adapts content, it does not define it.

---

## storage

Persistence abstraction layer.

### Responsibilities

* SQLite access layer
* Repository implementations
* Data persistence logic
* Import/export mechanisms

### Restrictions

* No UI dependencies
* No content interpretation
* No direct domain logic

storage acts as infrastructure only.

---

## shared

Low-level utilities layer.

### Responsibilities

* Pure functions
* Generic helpers
* Type utilities
* Constants

### Restrictions

* No domain knowledge
* No UI logic
* No dependency on other Praxis packages

shared must remain completely framework-agnostic.

---

# Dependency Rules

## Allowed Dependencies

### apps

May depend on:

* ui
* core
* core/services
* content
* i18n
* storage
* shared

---

### ui

May depend on:

* shared
* i18n

May NOT depend on:

* core
* content
* storage
* apps

---

### core

May depend on:

* content
* i18n
* shared

May NOT depend on:

* ui
* apps
* storage (directly)

---

### core/services

May depend on:

* core
* content
* i18n
* storage (through abstraction contracts only)

May NOT depend on:

* ui

---

### content

May depend on:

* shared

May NOT depend on:

* core
* ui
* apps
* storage

---

### i18n

May depend on:

* shared

May NOT depend on:

* core
* ui
* apps

---

### storage

May depend on:

* shared
* core (types only, no logic coupling)

May NOT depend on:

* ui
* apps

---

### shared

Must not depend on any internal Praxis package.

---

# Import System Convention

All cross-package imports must use scoped aliases:

```text id="b3kq9m"
@praxis/core
@praxis/ui
@praxis/content
@praxis/i18n
@praxis/storage
@praxis/shared
```

### Rules

* Relative imports across packages are forbidden
* Only internal package boundaries via scoped imports are allowed
* Each package exposes a public API via `index.ts`

---

# Public API Enforcement

Each package must define a strict public interface:

* index.ts is the only allowed entry point
* internal files cannot be imported externally
* internal structure is private by default

This ensures encapsulation and prevents leakage of implementation details.

---

# Application Layer Separation

## Web vs Desktop

Both runtimes share:

* core logic
* content model
* i18n system

Differences:

### apps/web

* browser storage fallback (future abstraction)
* web-specific routing and rendering

### apps/desktop

* filesystem access
* native APIs via Tauri
* offline-first guaranteed persistence layer

Both must behave identically from a domain perspective.

---

# Testing Boundaries

Testing is allowed across packages under controlled conditions.

## Rules

* core may mock content and storage
* services may mock core and storage
* UI tests may mock core outputs only
* cross-package tests must not bypass public APIs

Testing must respect production boundaries.

---

# Versioning Strategy

Current decision:

* Monorepo versioned as a single unit (initial phase)
* Future evolution may split into independent package versioning

### Rationale

* Simplifies early development
* Avoids dependency drift
* Ensures consistency during rapid content evolution

Future ADR will define:

* semantic versioning per package
* content version separation
* release synchronization model

---

# Extension Points (Future ADR Hooks)

This architecture intentionally leaves space for:

* Plugin system (content extensions)
* External exercise providers
* Custom learning modules
* Adaptive learning engines

No implementation is defined yet, only structural compatibility.

---

# Constraints Summary

* No circular dependencies
* Strict public API enforcement
* UI must remain presentation-only
* Core must remain domain-only
* Content must remain declarative
* Storage must remain infrastructural
* Shared must remain minimal and pure

---

# Decision

Praxis enforces a layered monorepo architecture with strict dependency directionality, scoped imports, and isolated package responsibilities.

Core domain logic is separated from content, UI, and storage layers, ensuring long-term scalability, maintainability, and extensibility while preserving offline-first and community-driven principles.
