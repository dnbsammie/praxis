# Local Persistence

---

# Overview

Praxis implements a fully local-first persistence system responsible for storing user progress, preferences, and learning state without requiring accounts, external services, or cloud dependencies.

The system is designed to be portable, exportable, and recoverable across devices through explicit user-controlled data transfer.

Persistence is a core part of the offline-first architecture and must guarantee consistency across both web and desktop environments.

---

# Storage Strategy

Praxis uses a hybrid persistence model composed of:

* SQLite (primary structured storage)
* JSON files (portable export/import format)
* Application memory state (runtime synchronization layer)

Each layer has a specific responsibility and abstraction boundary.

---

# SQLite Layer (Primary Storage)

SQLite is the canonical persistence backend for structured user data.

It is used in both:

* Tauri desktop environment (native filesystem access)
* Web environment (via WASM or IndexedDB-backed SQLite abstraction depending on implementation)

---

## Responsibilities

SQLite stores all structured and relational data:

* User progress per lesson
* Module completion state
* Exercise attempt history
* Hint progression state
* Learning path unlocks
* Local configuration state
* Language and UI preferences
* Metadata related to content versioning

---

## Design Goals

* ACID compliance for consistency
* Fast local queries
* Structured relational modeling
* Offline reliability
* Cross-platform compatibility

---

## Data Integrity

SQLite acts as the single source of truth for user state.

All application-level state mutations must be persisted through controlled repository abstractions defined in `packages/storage`.

Direct database access from UI or content layers is strictly prohibited.

---

# JSON Export/Import Layer

In addition to SQLite, Praxis provides a portable JSON-based persistence format.

This layer is designed for:

* Device migration
* Backup creation
* Cross-device synchronization (manual or future automated)
* Offline sharing of learning progress

---

## Export Format

The exported file contains:

* User progress snapshot
* Completed lessons
* Exercise history summary
* Preferences
* Content version metadata
* Timestamp and schema version

The format is deterministic and versioned.

---

## Import Behavior

When importing a JSON file:

* Data is validated against schema
* Conflicts are resolved based on defined merge rules
* Existing progress may be merged or replaced
* Content version mismatches are handled gracefully

---

## Portability Principle

No account system is required.

Users can move their entire learning progress between devices by exporting a single file.

This ensures:

* No vendor lock-in
* No subscription requirement
* Full user ownership of data

---

# Runtime Application State

In addition to persistent storage layers, Praxis maintains an in-memory state layer.

---

## Responsibilities

* UI synchronization
* Lesson rendering state
* Temporary interaction state
* Navigation state
* Exercise session state

---

## Characteristics

* Ephemeral
* Non-authoritative
* Derived from SQLite
* Resettable without data loss

---

## Synchronization Model

Application state is continuously synchronized with SQLite through repository abstractions.

State updates follow a unidirectional flow:

1. User interacts with UI
2. Action triggers domain logic (`core` / `exercises`)
3. Persistence layer updates SQLite
4. Runtime state is refreshed
5. UI re-renders

---

# Export/Import System Architecture

The export/import system is a first-class feature of the persistence layer.

It is exposed through both:

* Desktop (Tauri filesystem APIs)
* Web (file download/upload APIs)

---

## Export Flow

1. Read full user state from SQLite
2. Transform into canonical JSON schema
3. Validate export consistency
4. Generate portable file
5. Deliver file to user

---

## Import Flow

1. User selects file
2. System parses JSON
3. Validate schema version
4. Compare with existing local state
5. Apply merge or replace strategy
6. Persist updated state into SQLite
7. Refresh runtime state

---

# Cross-Device Continuity Model

Although Praxis does not require accounts or cloud services, it supports continuity through manual or future automated transfer mechanisms.

---

## Current Model (Manual Transfer)

Users maintain continuity via:

* Export file generation
* Import on another device

This model ensures:

* No authentication system required
* No external infrastructure dependency
* Full user control over data movement

---

## Future Model (Optional Synchronization)

Future extensions may introduce:

* Peer-to-peer sync
* Encrypted cloud storage (optional)
* Versioned content alignment across devices

These features must remain optional and never replace local persistence.

---

# Package Responsibilities

## packages/storage

This package acts as the abstraction layer over persistence systems.

### Responsibilities

* SQLite schema definition
* Repository interfaces
* Query abstraction
* Migration handling
* Export/import orchestration

---

## apps/web / apps/desktop

Applications consume storage only through `packages/storage`.

They must not:

* Access SQLite directly
* Manipulate persistence formats
* Bypass repository abstractions

---

## packages/core

Core defines the domain state model that persistence systems store.

It ensures:

* Consistency of learning logic
* Structural integrity of progress data
* Deterministic state transitions

---

# Data Consistency Rules

## 1. Single Source of Truth

SQLite is the authoritative persistence layer.

All other representations are derived.

---

## 2. No Partial Writes

State changes must be atomic at the domain level.

Partial updates that violate consistency are not allowed.

---

## 3. Versioned State Schema

All persisted data includes:

* Schema version
* Content version
* Migration metadata

This ensures compatibility across application updates.

---

## 4. Deterministic Reconstruction

Given the same SQLite state, the system must always reconstruct identical application state.

---

# Design Decisions

## 1. SQLite as Primary Storage

Chosen for:

* Reliability
* Portability
* ACID guarantees
* Cross-platform support

---

## 2. JSON Export as First-Class Feature

Chosen to ensure:

* User autonomy
* Device independence
* No account requirement
* Offline-first philosophy

---

## 3. Separation of Runtime State and Persistence

Chosen to:

* Improve performance
* Simplify UI logic
* Avoid direct coupling to database layer

---

# Future Considerations

## 1. Encrypted Exports

Future versions may support:

* Password-protected exports
* Encrypted backup files
* Secure sharing of progress

---

## 2. Differential Sync

Instead of full export/import:

* Delta-based synchronization
* Conflict resolution strategies
* Merge policies per domain

---

## 3. Multi-Profile Support

Future expansion may include:

* Multiple local user profiles
* Role-based progress separation
* Shared device environments

---

## 4. Cloud-Optional Backup Layer

Optional service layer may provide:

* Encrypted backup storage
* Cross-device synchronization
* Version rollback capabilities

This layer must never replace local persistence.

---

# Constraints

* No mandatory external accounts
* SQLite remains the primary source of truth
* JSON export must remain fully portable and schema-driven
* All persistence logic must remain isolated in `packages/storage`
* UI must never directly interact with storage engines

---

# Decision

Praxis implements a fully local-first persistence architecture based on SQLite as the primary storage engine, complemented by a portable JSON export/import system that enables user-controlled cross-device continuity without accounts, subscriptions, or external dependencies.

The system ensures full ownership of data, offline reliability, and long-term extensibility toward optional synchronization models.
