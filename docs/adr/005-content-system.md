# Content System

---

# Overview

Praxis treats educational material as a first-class architectural component.

Content is not embedded in UI logic or application code. Instead, it is defined, versioned, validated, and distributed through dedicated packages.

The system is designed to support structured learning paths, multilingual content, and community-driven contributions while remaining fully offline-capable.

---

# Core Packages Involved

## packages/content

This package is the canonical source of educational material.

It defines:

* Courses
* Lessons
* Modules / Topics
* Metadata structures
* Exercise references
* Learning paths
* Content validation rules

It is treated as a domain artifact rather than static data.

### Responsibilities

* Define content structure schemas
* Store lesson definitions
* Organize learning paths
* Provide content indexing utilities
* Ensure structural consistency

### Characteristics

* Version-controlled via Git
* Framework-independent
* UI-agnostic
* Serializable and portable

---

## packages/i18n

This package handles all localization concerns.

It provides language abstraction over content without duplicating structural definitions.

### Responsibilities

* Translation mapping
* Locale resolution
* Language fallback logic
* Formatting utilities (dates, numbers, text direction in future)
* Multi-language content binding

### Key Principle

i18n does not define content. It only adapts content to a target language.

---

# Content + i18n Relationship

Content and i18n operate as two separate but coordinated layers.

## Content Layer

Defines what is taught:

* Structure
* Logic
* Sequence
* Exercises
* Metadata

## i18n Layer

Defines how content is presented linguistically:

* Titles
* Descriptions
* Instructions
* UI-related educational text

---

## Binding Mechanism

Each content entity (course, lesson, module) is language-agnostic at its core but supports translation overlays.

Example concept:

* content/lesson-id → structural definition
* i18n/lesson-id → language-specific representation

The runtime resolves:

1. Load base content structure
2. Resolve selected locale
3. Apply translation overlays
4. Render final educational model

---

# Content Model Strategy

The system follows a declarative model:

* Content is expressed as structured data, not executable logic.
* Lessons are composed of blocks.
* Exercises are embedded as references, not inline logic.

This ensures:

* Predictability
* Versioning clarity
* Easy validation
* Safe community contributions

---

# Contribution Model

Content is designed to be community-editable.

## Allowed Contributions

* New courses
* New lessons
* Improvements to explanations
* Translation additions
* Exercise refinements
* Structural improvements

## Review Requirements

All content changes must:

* Pass schema validation
* Respect structural rules
* Maintain backward compatibility where possible
* Be reviewed like code changes

---

# Validation Layer

A validation system ensures correctness of content before it is accepted into the system.

It checks:

* Schema compliance
* Missing references
* Broken lesson chains
* Invalid exercise definitions
* i18n completeness (when required)

Validation runs during CI and optionally during local builds.

---

# Design Decisions (Current)

## 1. Content is stored inside the repository

Rationale:

* Enables versioning with code
* Simplifies contributions
* Ensures offline availability

---

## 2. Separation between content and i18n

Rationale:

* Avoids duplication of structural data
* Allows independent translation workflows
* Enables community localization contributions

---

## 3. Declarative content model

Rationale:

* Reduces runtime complexity
* Improves validation
* Enables predictable rendering pipelines

---

## 4. Content is framework-agnostic

Rationale:

* Allows reuse across web and desktop
* Prevents coupling with SvelteKit or Tauri
* Supports future clients

---

# Future Design Considerations

## 1. Dynamic Content Updates

Future versions may support:

* Downloadable content packs
* Partial course updates
* Versioned synchronization
* Delta-based updates

---

## 2. Advanced Localization System

Potential improvements:

* Regional variations per language
* Community-suggested translations
* Translation scoring and review system
* Automatic fallback hierarchies

---

## 3. Content Graph Model

Future evolution may introduce a graph-based learning system:

* Non-linear learning paths
* Adaptive progression
* Prerequisite-based navigation
* Personalized learning routes

---

## 4. Versioned Content Releases

Content will eventually be versioned independently from application releases:

* Content v1.0.0
* App v0.0.123

This allows:

* Faster content iteration
* Independent release cycles
* Stable app runtime with evolving educational material

---

## 5. Media Expansion Layer

Future support for:

* Interactive diagrams
* Embedded simulations (non-browser-based)
* External tool references
* Rich multimedia explanations

---

# Constraints

* Content must remain UI-agnostic
* i18n must not alter structural definitions
* No runtime code execution inside content definitions
* All content must be statically analyzable
* Circular dependencies between content and i18n are forbidden

---

# Decision

Praxis implements a dual-layer content system where `packages/content` defines the structural educational model and `packages/i18n` provides localized representations.

Both systems are strictly separated, version-controlled, and validated through schema-driven rules to ensure scalability, community contribution safety, and full offline compatibility.
