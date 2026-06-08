# Internationalization System

---

# Overview

Praxis implements a dual-layer internationalization system designed to support both application-level translations and educational content localization at scale.

The system is structured to handle:

* UI translations (system, navigation, errors)
* Educational content translation (courses, lessons, exercises)
* Multi-language expansion without structural duplication
* Community-driven language contributions

The architecture prioritizes scalability, consistency, and separation between structure and linguistic representation.

---

# Core Design Principle

Internationalization is not a rendering concern.

It is a data transformation layer applied over a language-agnostic content model.

The system ensures that:

* Content structure remains unchanged across languages
* Only textual representations vary per locale
* UI and content translations coexist without coupling

---

# Directory Structure

All localization resources are stored in a centralized `locales/` directory.

```text id="i18n1"
locales/
├── en/
├── es/
├── pt/
├── de/
├── fr/
└── ...
```

Each language contains modular translation domains.

---

## Internal Structure per Locale

Each locale is divided into domain-specific files:

```text id="i18n2"
en/
├── common.json
├── navigation.json
├── errors.json
├── ui.json
├── content.json
```

---

## Domain Responsibilities

### common.json

Shared generic strings:

* Buttons
* Labels
* Generic UI text

---

### navigation.json

Routing and structural UI elements:

* Menu labels
* Page titles
* Section identifiers

---

### errors.json

System and validation messages:

* Error codes
* User-facing failures
* System exceptions

---

### ui.json

Component-level interface text:

* Tooltips
* Descriptions
* Interaction hints

---

### content.json

Specialized translation layer for educational material.

This file does not directly store full content, but acts as a mapping layer over `packages/content`.

---

# Content Localization Model

Educational content is treated as language-agnostic structure defined in:

```text id="i18n3"
packages/content
```

Translation is applied through `packages/i18n`.

---

## Translation Strategy

Each content entity is referenced via stable identifiers:

* course_id
* module_id
* lesson_id
* block_id

The i18n layer maps these identifiers to localized strings.

---

## Example Model

Content definition (language-neutral):

* lesson: rust-ownership-01
* block: explanation-01

Localized representation:

```text id="i18n4"
en/content.json
es/content.json
pt/content.json
```

Mapping example:

```json
{
  "rust-ownership-01.title": "Ownership in Rust",
  "rust-ownership-01.blocks.explanation-01": "Ownership is a core concept..."
}
```

---

# Content Interpretation Layer

Localization is applied at runtime through a resolution pipeline:

## Steps

1. Load base content structure from `packages/content`
2. Detect active locale
3. Fetch matching translation files
4. Resolve content keys to localized strings
5. Render final structured lesson model

---

## Separation Rule

* `content/` defines structure and meaning
* `i18n/` defines language representation
* `core/` coordinates interpretation
* `ui/` renders final output only

---

# Package Responsibilities

## packages/i18n

Primary localization engine.

### Responsibilities

* Locale loading
* Translation resolution
* Fallback handling
* Key mapping for content
* Runtime translation API

---

## packages/content

Language-agnostic educational definitions.

### Responsibilities

* Course structure
* Lesson hierarchy
* Exercise references
* Block definitions

---

## core

Acts as orchestration layer.

### Responsibilities

* Merge content + i18n
* Produce runtime learning models
* Ensure consistency between translations and structure

---

## ui

Consumes resolved localized data only.

### Responsibilities

* Rendering
* Interaction handling
* Display logic only

---

# Fallback System

The system supports hierarchical fallback:

```text id="i18n5"
pt → en → fallback system default
```

If a translation key is missing:

* System falls back to English
* If English is missing, fallback to base content identifier
* If unresolved, system flags missing translation

---

# Scalability Considerations

## 1. Language Growth

System is designed to scale to dozens of languages without structural change.

Adding a language requires only:

* New locale folder
* Translation mapping files
* Optional content coverage expansion

---

## 2. Community Contributions

Translation files are designed for community editing:

* Independent JSON domains
* Isolated review process
* Mergeable via pull requests

---

## 3. Content Growth

As content expands:

* Translation mapping scales linearly
* No duplication of structural content
* No need for per-language content forks

---

## 4. Performance Optimization

To maintain efficiency:

* Translation files are cached per session
* Only active locale is loaded
* Lazy loading is used for large content graphs

---

# Design Decisions

## 1. Separation of Content and Localization

Content and translation are fully decoupled.

Reason:

* Prevent duplication
* Enable independent evolution
* Reduce maintenance overhead

---

## 2. JSON-Based Locale Structure

JSON is used for simplicity and tool compatibility.

Reason:

* Easy parsing
* Git-friendly diffs
* Broad tooling support

---

## 3. Centralized Locale Directory

All translations live under a single structure.

Reason:

* Predictable organization
* Easier CI validation
* Simplified contribution workflow

---

## 4. Key-Based Content Mapping

Content is referenced via stable keys.

Reason:

* Enables deterministic translation
* Avoids structural duplication
* Supports scalable content graphs

---

# Future Extensions

## 1. Advanced Translation Workflow

Potential improvements:

* Translation review system
* Quality scoring per language
* Community validation layers
* AI-assisted translation suggestions (external tooling only)

---

## 2. Partial Language Support Detection

System may detect:

* incomplete languages
* partially translated courses
* missing module coverage

and adjust UI accordingly.

---

## 3. Regional Variants

Future support for:

* en-US vs en-UK
* es-ES vs es-LATAM

without structural duplication.

---

## 4. Dynamic Content Localization

Future evolution may allow:

* real-time content translation layers
* plugin-based translation engines
* adaptive language switching

---

# Constraints

* Content structure must remain language-agnostic
* i18n must not define learning structure
* No runtime logic inside translation files
* All keys must be deterministic and stable
* UI must not directly resolve raw content

---

# Decision

Praxis implements a scalable internationalization system that separates UI translations and educational content localization into a unified but clearly decoupled architecture.

The system is designed for multi-language expansion, community contribution, and long-term maintainability without duplicating structural content or introducing language-specific forks.
