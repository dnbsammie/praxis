# Content Model

---

# Overview

The Content Model defines the structural representation of all educational material in Praxis.

It formalizes how knowledge is represented, composed, validated, and consumed across the system.

Unlike the Content System (which focuses on package organization and multilingual separation), this ADR defines the internal data structures and hierarchical relationships that describe learning content.

---

# Core Principle

All educational content is declarative, hierarchical, and composable.

It is designed to be:

* Machine-readable
* Version-controlled
* Language-agnostic
* Framework-independent
* Statically analyzable

No content unit contains executable logic.

---

# Hierarchical Structure

The learning system is structured as a multi-level tree.

## Top Level: Topics

A Topic represents a broad knowledge area.

Examples:

* Computer Science Fundamentals
* Mathematics
* Programming Languages
* Logic Systems

### Responsibilities

* Group related courses
* Define macro learning domains
* Provide navigation entry points

---

## Level 2: Courses

Courses are structured learning paths within a topic.

They define a coherent progression of knowledge.

Examples:

* Rust Programming
* Linear Algebra Basics
* Discrete Mathematics

### Responsibilities

* Define ordered learning sequence
* Group modules
* Track progression milestones
* Define prerequisites

---

## Level 3: Modules

Modules represent focused subdomains within a course.

Examples:

* Ownership in Rust
* Matrix Operations
* Boolean Logic

### Responsibilities

* Segment course into conceptual blocks
* Introduce intermediate learning goals
* Organize lessons

---

## Level 4: Lessons

Lessons are the primary unit of learning.

Each lesson is designed to be completed in approximately 20 minutes.

A lesson is composed of:

* Concept structure
* Dynamic theory
* Exercise(s)

Lessons are immutable once published within a given version.

---

## Level 5: Blocks

Blocks are the smallest compositional unit of content.

They define how information is rendered and interpreted.

---

# Block System

Blocks define all renderable content inside lessons.

Each block has a type and structured payload.

---

## Text Block

Represents explanatory content.

Used for:

* Theory explanations
* Concept descriptions
* Narrative content

---

## Code Block

Represents code snippets.

Used for:

* Programming examples
* Syntax demonstrations
* Algorithm explanations

Code blocks are language-aware but execution-agnostic.

---

## Concept Block

Represents structured conceptual explanations.

Used for:

* Definitions
* Key ideas
* Formal explanations

---

## Exercise Block

Represents an embedded exercise reference.

It does not contain logic itself, only metadata linking to the Exercise Engine.

---

## Hint Block

Represents optional guidance tied to exercises.

Hints are progressively revealed by the Exercise Engine.

---

## Media Block

Represents non-textual content.

Future support includes:

* Diagrams
* Images
* Interactive visuals
* External references

---

# Lesson Composition Model

A lesson is composed of three coordinated layers:

---

## 1. Concept Index Layer

A structured list of concepts covered in the lesson.

Example:

* Rust Basics
* Ownership
* Structs & Enums
* Error Handling

### Purpose

* Provide cognitive roadmap
* Establish conceptual dependency order
* Support navigation and mental mapping

This layer is non-interactive metadata-driven structure.

---

## 2. Theory Layer (Dynamic Book)

A lesson includes a structured theoretical system composed of blocks.

### Characteristics

* Hierarchical explanation depth
* Progressive disclosure of complexity
* Multi-paradigm explanations:

  * Logical
  * Mathematical
  * Computational

### Structure

The theory layer is composed of ordered blocks:

* Concept blocks
* Text blocks
* Code blocks

The rendering system adapts presentation based on user context.

---

## 3. Exercise Layer

Each lesson includes one or more exercises linked via metadata.

Exercises are not embedded logic but references to the Exercise Engine.

They include:

* Statement reference
* Requirements metadata
* Setup instructions
* Difficulty metadata
* Hint configuration

---

# Content Schema Model

All content follows strict schemas defined in `packages/content`.

## Course Schema (conceptual)

* id
* title
* description
* prerequisites
* modules[]
* metadata

---

## Module Schema

* id
* title
* description
* lessons[]
* difficulty level
* prerequisites

---

## Lesson Schema

* id
* title
* conceptIndex[]
* blocks[]
* exercises[]
* estimatedDuration (default ~20 min)

---

## Block Schema

Each block includes:

* id
* type
* content payload
* metadata
* localization keys (optional via i18n layer)

---

# Relationship with i18n

The Content Model is language-agnostic.

Localization is applied externally through `packages/i18n`.

## Separation Rule

* Content defines structure and meaning
* i18n defines linguistic representation

Example:

* Lesson structure remains identical across languages
* Only display strings are localized

---

# Validation Rules

All content must pass validation before being accepted into the system.

## Structural Validation

* No missing references
* No broken lesson chains
* Valid hierarchy (topic → course → module → lesson → block)

---

## Integrity Validation

* Exercises must exist and be resolvable
* Blocks must conform to schema
* Metadata must be consistent

---

## Localization Validation (optional layer)

* Required translations must exist (depending on configuration)
* Fallback languages must be defined
* Missing keys must be detected

---

# Versioning Model

Content is versioned independently from application runtime.

## Principles

* Content evolves continuously
* Application remains stable
* Versions are explicitly tracked

## Example model

* Content v1.0
* Content v1.1
* Content v2.0

Each version may introduce:

* New courses
* Updated lessons
* Improved explanations
* Modified exercises

---

# Design Decisions

## 1. Strict Hierarchical Model

Content follows a rigid hierarchy.

Reason:

* Predictable navigation
* Easier validation
* Clear dependency resolution

---

## 2. Block-Based Composition

Lessons are built from reusable blocks.

Reason:

* Flexibility
* Consistent rendering pipeline
* Extensibility for future media types

---

## 3. Separation from Execution Logic

Exercises are not defined as executable code inside content.

Reason:

* Maintain offline determinism
* Avoid runtime coupling
* Centralize evaluation in Exercise Engine

---

## 4. Language Independence

Content structure is independent of language.

Reason:

* Enables scalable i18n system
* Prevents duplication
* Supports community translation workflows

---

# Future Extensions

## 1. Graph-Based Content Model

Future evolution may replace strict hierarchy with a graph structure:

* Non-linear learning paths
* Adaptive progression
* Multi-prerequisite systems
* Skill-based navigation

---

## 2. Semantic Content Layer

Introduction of semantic tagging:

* Concept relationships
* Difficulty mapping
* Cognitive clustering

---

## 3. Rich Media Expansion

Support for:

* Interactive diagrams
* Embedded simulations (non-browser runtime)
* Visual programming representations

---

## 4. AI-Assisted Content Structuring (Optional)

Future tooling may assist contributors with:

* Lesson structuring
* Block generation
* Translation suggestions

This remains external to runtime system.

---

# Constraints

* No execution logic inside content definitions
* Strict adherence to schema validation
* No UI-specific assumptions
* No runtime dependencies
* Must remain serializable and portable

---

# Decision

Praxis defines a strict, hierarchical, block-based content model that separates structure, theory, and exercises into composable units.

The model is language-agnostic, versioned independently, and designed for validation, extensibility, and long-term scalability across multiple learning domains.
