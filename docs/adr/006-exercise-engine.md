# Exercise Engine

---

# Overview

The Exercise Engine defines how Praxis delivers guided practice, structured challenges, and incremental learning inside lessons.

It is not a sandbox execution system nor a browser-based coding judge. Instead, it is a structured learning orchestration layer that coordinates theory, progression, and project-based exercises across both web and desktop clients.

The engine is designed to work fully offline and to integrate seamlessly with the content and i18n systems.

---

# Learning Progression Model

Praxis uses a progression-based system where access to new content depends on completion of prior modules.

## Core Progression Paths

Users advance through structured educational domains:

* Logic
* Mathematics
* Algebra
* Computer Science fundamentals
* Programming languages (e.g., Rust, TypeScript, etc.)

Each domain contains hierarchical levels and modules.

Progression unlocks:

* New lessons
* More advanced exercises
* Additional conceptual depth
* Cross-domain challenges

---

## Language Progression

For programming languages, users progress through skill tiers:

* Beginner
* Intermediate
* Advanced
* Project-oriented mastery

Advancement unlocks deeper concepts and more complex problem structures.

---

# Lesson Structure

Each lesson is composed of three main components.

---

## 1. Conceptual Structure (Index Layer)

Each lesson begins with a structured conceptual outline.

Example (Rust):

* 01 Rust Basics
* 02 Ownership
* 03 Structs & Enums
* 04 Error Handling
* 05 Traits
* 06 Lifetimes

### Purpose

* Provide navigational structure
* Define conceptual progression inside the lesson
* Establish mental model hierarchy
* Serve as anchor points for the dynamic theory system

This layer is static and defined in `packages/content`.

---

## 2. Dynamic Theory Layer

Each lesson includes a “dynamic book” of theory.

This is not a static article, but a structured educational model composed of:

* Explanations
* Code snippets
* Logical reasoning
* Mathematical interpretation (when applicable)
* Computational modeling
* Step-by-step conceptual breakdowns

### Characteristics

* Context-aware
* Structured into blocks
* Expandable based on user interaction
* Supports multi-level explanations (simple → deep → formal)

### Purpose

To bridge the gap between:

* Human intuition
* Formal reasoning
* Computational implementation

This layer is generated from content definitions and localized via `packages/i18n`.

---

## 3. Exercise Layer

Each lesson contains at least one guided exercise.

Exercises are structured learning tasks, not automated coding evaluations.

### Components

Each exercise includes:

* Problem statement
* Setup guide (dependencies, environment preparation, or context requirements)
* Requirements list
* Optional hints system
* Progressive assistance system
* Partial solution disclosure mechanism

---

## Progressive Hint System

If a user fails to complete an exercise, the system provides incremental guidance over multiple attempts.

### Attempt Flow

* Attempt 1–2: General hints
* Attempt 3: Structural guidance
* Attempt 4: Partial logic exposure
* Attempt 5: Partial solution breakdown

Full solutions are never immediately exposed.

The goal is to preserve cognitive effort while preventing user stagnation.

---

# Exercise Engine Architecture

The engine is composed of three interacting layers:

## 1. Content Layer (`packages/content`)

Defines:

* Lesson structure
* Exercise definitions
* Progression rules
* Metadata
* Learning paths

It is the source of truth for all educational logic.

---

## 2. Exercise Logic Layer (`packages/exercises`)

Defines:

* Execution rules
* Hint progression system
* Validation logic (non-browser-based)
* State transitions
* Exercise lifecycle management

This layer does NOT execute user code.

It only evaluates structured responses and learning states.

---

## 3. Runtime Clients (SvelteKit + Tauri)

### Responsibilities

Both clients act as presentation and orchestration layers:

* Render lesson structure
* Display dynamic theory blocks
* Present exercises
* Capture user interactions
* Request evaluation from exercise engine
* Persist progress locally via storage layer

---

# Communication Flow

The system operates through a unidirectional data flow.

## Flow Overview

1. Client loads content from `packages/content`
2. i18n layer resolves localized strings via `packages/i18n`
3. Exercise engine interprets lesson structure
4. UI renders:

   * Concept index
   * Theory blocks
   * Exercise interface
5. User interacts with exercise
6. Response is passed to `packages/exercises`
7. Engine returns:

   * Validation result
   * Hint level
   * Progress updates
8. Storage layer persists progress locally
9. UI updates state

---

# Cross-Package Responsibilities

## content

* Defines exercises declaratively
* Provides metadata for progression
* Structures lesson hierarchy

---

## exercises

* Defines evaluation rules
* Controls hint progression
* Manages attempt lifecycle
* Encapsulates learning logic

---

## i18n

* Translates:

  * Exercise statements
  * Hints
  * Theory blocks
* Ensures language consistency across progression system

---

## storage

* Persists:

  * Exercise completion state
  * Attempt history
  * Progress markers
* Maintains offline reliability

---

## UI (SvelteKit / Tauri)

* Renders structured lesson views
* Displays dynamic theory
* Handles user input
* Coordinates engine responses
* Maintains interaction state

---

# Design Principles

## 1. No Code Execution in Engine

The engine does not execute user code.

It evaluates structured learning states instead of runtime outputs.

---

## 2. Separation of Theory and Practice

Theory is not directly tied to exercises.

It is a parallel system that supports conceptual understanding.

---

## 3. Progressive Cognitive Load

Complexity increases gradually through:

* Module unlocking
* Lesson progression
* Hint system escalation

---

## 4. Deterministic Learning Flow

Given the same state and inputs, the system must always produce consistent outputs.

---

# Future Considerations

## 1. Adaptive Learning System

Future versions may introduce:

* Personalized difficulty scaling
* Skill-based recommendations
* Dynamic exercise ordering

---

## 2. Multi-Path Learning

Users may be allowed to:

* Skip modules based on mastery
* Choose alternative learning routes
* Explore parallel conceptual tracks

---

## 3. Collaborative Learning Extensions

Potential future features:

* Shared learning paths
* Community-defined exercises
* Peer review of solutions

---

## 4. External Tool Integration (Optional)

While the engine avoids code execution, future versions may integrate:

* Local compilers
* CLI-based validation tools
* External language runtimes

These must remain optional and non-blocking.

---

# Constraints

* No runtime code execution inside the engine
* No dependency on UI frameworks
* No direct coupling to SvelteKit or Tauri
* All logic must be serializable and testable
* Exercises must remain declarative

---

# Decision

Praxis implements a structured Exercise Engine that orchestrates lesson progression, dynamic theory, and guided exercises across modular content packages.

The system enforces progressive learning, offline-first behavior, and strict separation between content definition, evaluation logic, and client rendering.
