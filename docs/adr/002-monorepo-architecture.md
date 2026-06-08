# Monorepo Architecture

---

# Overview

Praxis is organized as a monorepo.

All applications, packages, educational content, documentation, configuration, and tooling live within a single repository and are developed, versioned, reviewed, and released together.

The monorepo structure is intended to maximize maintainability, consistency, contributor experience, and long-term scalability while avoiding unnecessary fragmentation across multiple repositories.

The repository serves as the single source of truth for the entire project.

---

# Motivation

Praxis is not composed solely of application code.

The project includes:

* User-facing applications.
* Shared libraries.
* Educational content.
* Localization resources.
* Documentation.
* Design assets.
* Build tooling.
* Future synchronization services.

These components evolve together and frequently depend on shared concepts.

Separating them into independent repositories would introduce additional complexity regarding:

* Dependency management.
* Version compatibility.
* Release coordination.
* Contributor onboarding.
* Cross-package refactoring.
* Documentation maintenance.

A monorepo allows architectural consistency while keeping development workflows simple.

---

# Architectural Goals

The repository structure must support the following goals:

## Clear Separation of Responsibilities

Each package must have a well-defined purpose.

Packages should represent business capabilities rather than arbitrary collections of utilities.

---

## Independent Evolution

Packages should be capable of evolving independently while remaining compatible with the overall architecture.

A package should expose stable public APIs and avoid leaking internal implementation details.

---

## Shared Ownership

Contributors should be able to understand, modify, and improve any area of the project without navigating multiple repositories.

---

## Scalable Growth

The repository should support future expansion without requiring structural redesign.

New features should primarily result in new packages rather than modifications to existing boundaries.

---

## Technology Independence

Business logic should remain independent from presentation frameworks and application runtimes.

This ensures that future clients can reuse the same core functionality.

---

# Repository Structure

The repository is divided into three primary areas.

```text
/
├── apps/
├── packages/
└── docs/
```

---

# Applications

Applications represent executable clients.

Applications are responsible for presentation, user interaction, and platform integration.

They should contain minimal business logic.

```text
apps/
├── web/
└── desktop/
```

---

## apps/web

Provides the browser-based experience.

Responsibilities:

* Routing
* Page composition
* Client-side rendering
* Web-specific integrations
* Progressive enhancement

Must not contain domain logic.

---

## apps/desktop

Provides the desktop experience through Tauri.

Responsibilities:

* Native integrations
* Desktop-specific features
* File system access
* Application packaging
* Platform services

Must not contain domain logic.

---

# Packages

Packages contain reusable functionality.

All business logic belongs inside packages.

Applications consume packages but should not reimplement their behavior.

```text
packages/
├── core/
├── content/
├── exercises/
├── storage/
├── ui/
├── i18n/
├── shared/
└── assets/
```

Additional packages may be added in the future when justified by architectural needs.

---

# Package Responsibilities

## core

Represents the domain layer.

This package contains the fundamental business concepts of Praxis.

Examples:

* Learning progression
* Course navigation
* Lesson models
* Progress calculation
* Domain services
* Educational workflows

The core package should remain independent from frameworks and UI technologies.

---

## content

Represents the educational content system.

Responsibilities include:

* Course definitions
* Lesson definitions
* Metadata
* Resource references
* Content schemas
* Validation rules

This package acts as the source of truth for educational material.

---

## exercises

Provides the guided exercise engine.

Responsibilities include:

* Exercise models
* Validation logic
* Exercise rendering metadata
* Completion rules
* Educational guidance structures

Exercises should remain independent from presentation concerns.

---

## storage

Provides persistence abstractions.

Responsibilities include:

* Repository interfaces
* Storage adapters
* Local database access
* Future synchronization mechanisms

Applications must never directly interact with database implementations.

---

## ui

Provides the shared design system.

Responsibilities include:

* Components
* Layouts
* Design tokens
* Typography
* Styling primitives
* Accessibility helpers

Business logic must never be implemented within UI components.

---

## i18n

Provides localization infrastructure.

Responsibilities include:

* Translation resources
* Locale management
* Language switching
* Formatting utilities

The package should support community-driven translation efforts.

---

## shared

Contains low-level reusable utilities.

Examples:

* Helper functions
* Shared types
* Constants
* Utility abstractions

The package should remain lightweight and dependency-free whenever possible.

---

## assets

Contains reusable static resources.

Examples:

* Icons
* Images
* Illustrations
* Audio resources
* Future educational media

Assets should be consumable by both web and desktop applications.

---

# Dependency Rules

Maintaining strict dependency boundaries is critical.

The following rules define allowed dependencies.

```text
apps
 ↓
ui
 ↓
core
 ↓
storage
 ↓
shared
```

Content, localization, and assets may be consumed where appropriate but must not introduce circular dependencies.

---

# Allowed Dependencies

## apps

May depend on:

* ui
* core
* content
* exercises
* storage
* i18n
* shared
* assets

---

## ui

May depend on:

* core
* i18n
* shared
* assets

Must never depend on applications.

---

## core

May depend on:

* shared

Must remain framework agnostic.

---

## content

May depend on:

* shared

Must remain independent from applications and UI.

---

## exercises

May depend on:

* core
* shared

Must remain independent from rendering implementations.

---

## storage

May depend on:

* core
* shared

Must never depend on UI packages.

---

## i18n

May depend on:

* shared

Must not depend on application code.

---

## shared

Must not depend on other Praxis packages.

---

# Forbidden Dependencies

The following relationships are explicitly prohibited.

```text
core → ui
core → apps

content → apps
content → ui

shared → apps
shared → ui

storage → ui

exercises → ui
```

Violating these boundaries creates coupling that reduces maintainability and portability.

---

# Package Creation Guidelines

A new package should only be created when at least one of the following conditions is met.

## Distinct Domain Responsibility

The functionality represents a clearly identifiable domain.

---

## Reuse Across Multiple Consumers

The functionality is shared by multiple packages or applications.

---

## Independent Evolution

The functionality is expected to grow significantly over time.

---

## Clear Ownership Boundary

The functionality introduces concepts that should remain isolated from existing packages.

---

# Avoiding a Distributed Monolith

A monorepo does not automatically produce good architecture.

To prevent the repository from becoming a distributed monolith, the following principles must be followed:

* Stable public APIs.
* Explicit package boundaries.
* Minimal cross-package dependencies.
* No circular references.
* Clear ownership of responsibilities.
* Framework-independent domain logic.
* Independent testing strategies.

Packages should collaborate through contracts rather than implementation details.

---

# Educational Content as a First-Class Citizen

Unlike traditional software projects, educational content is one of the primary deliverables of Praxis.

For this reason:

* Content lives inside the repository.
* Content participates in reviews.
* Content participates in releases.
* Content follows versioning rules.
* Content is treated with the same importance as source code.

Changes to educational material are architectural changes and should be reviewed with the same rigor as software modifications.

---

# Future Expansion

The architecture should support future packages such as:

```text
packages/
├── sync/
├── search/
├── analytics/
├── plugins/
├── recommendations/
└── validation/
```

Future additions should integrate through existing boundaries rather than modifying foundational architectural decisions.

---

# Decision

Praxis will adopt a monorepo architecture managed through shared tooling, strict package boundaries, and domain-oriented package organization.

Applications will remain thin clients, business logic will reside in reusable packages, educational content will be treated as a first-class project artifact, and architectural boundaries will be enforced to preserve maintainability as the project grows.
