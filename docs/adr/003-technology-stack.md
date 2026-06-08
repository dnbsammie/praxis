# Technology Stack

---

# Overview

Praxis uses a modern TypeScript-first and Rust-backed stack designed to support cross-platform development, offline-first behavior, and long-term maintainability.

The stack prioritizes:

* Performance
* Developer experience
* Cross-platform compatibility
* Strong type safety
* Ecosystem stability
* Low runtime overhead

The architecture is intentionally conservative in dependencies to reduce long-term maintenance risk.

---

# Frontend Stack

## SvelteKit

SvelteKit is the primary framework for web-based and desktop-rendered UI layers.

It is used in `apps/web` and integrated into the Tauri frontend in `apps/desktop`.

### Reasons for selection

* Compile-time reactivity model reduces runtime overhead
* Minimal boilerplate compared to React/Vue ecosystems
* Strong performance characteristics
* Flexible routing and rendering modes
* Good integration with TypeScript

### Responsibilities

* Routing
* UI composition
* State-driven rendering
* Client-side interactions
* API integration (future)
* View layer orchestration

SvelteKit must not contain domain logic. It acts strictly as a presentation layer over `core`, `content`, and other packages.

---

## TypeScript

TypeScript is the primary language for all JavaScript-based layers.

### Usage scope

* Frontend applications
* Shared packages
* Domain modeling (where applicable)
* Tooling scripts

### Design intent

TypeScript is used as a structural enforcement tool rather than optional typing. Strict mode is required across the entire repository.

---

# Desktop Stack

## Tauri

Tauri is used to build the desktop application.

It provides a lightweight native shell around the SvelteKit frontend.

### Responsibilities

* Window management
* Native system integration
* File system access
* Application packaging
* Platform-specific APIs

### Rationale

Tauri is selected over Electron due to:

* Lower memory usage
* Smaller binary size
* Rust-based backend layer
* Better performance characteristics
* Improved security model

---

## Rust

Rust is used exclusively in the Tauri backend layer.

### Responsibilities

* System-level operations
* File system abstraction
* Secure native APIs
* Performance-critical logic (if needed in future)

Rust is not used for domain logic or educational content processing unless strictly required for performance or system constraints.

---

# Monorepo Tooling

## TurboRepo

TurboRepo manages build orchestration across the monorepo.

### Responsibilities

* Task pipeline execution
* Incremental builds
* Caching
* Dependency graph resolution
* Parallel execution

### Goals

* Reduce build times
* Improve CI efficiency
* Ensure consistent task execution across packages

TurboRepo is a foundational tool for scaling the repository without sacrificing performance.

---

## PNPM

PNPM is the package manager for the entire monorepo.

### Responsibilities

* Dependency installation
* Workspace linking
* Lockfile management
* Hoisting control

### Reasons for selection

* Efficient disk usage via content-addressable store
* Strict dependency isolation
* Native monorepo support
* Faster installation compared to npm/yarn in large workspaces

PNPM ensures deterministic installs across contributors and CI environments.

---

# Code Quality Tooling

## ESLint

ESLint is used for static analysis of TypeScript and JavaScript code.

### Responsibilities

* Code correctness rules
* Best practices enforcement
* Consistency checks
* Import hygiene
* Potential runtime issue detection

ESLint is applied across all TypeScript-based packages and applications.

---

## Prettier

Prettier is used for code formatting.

### Responsibilities

* Automatic formatting
* Consistent style enforcement
* Elimination of stylistic debates in reviews

Prettier is treated as a formatting authority and must not be overridden manually.

---

## Future Transition: Biome

Biome is considered a future replacement for ESLint + Prettier.

### Motivation

* Unified toolchain (lint + format)
* Faster execution
* Reduced configuration complexity
* Modern Rust-based performance model

### Current decision

Biome is not adopted initially due to ecosystem compatibility concerns with SvelteKit and existing tooling maturity.

Migration will be reconsidered once ecosystem support stabilizes.

---

# CI/CD

## GitHub Actions

GitHub Actions is the primary CI/CD system.

### Responsibilities

* Automated testing
* Linting validation
* Build verification
* Release pipelines
* Content validation checks
* Monorepo task orchestration via TurboRepo

### Goals

* Ensure reproducibility
* Enforce quality gates
* Automate release workflows
* Validate content integrity on contribution

---

# Testing Stack

## Vitest

Vitest is used for unit testing across TypeScript packages.

### Responsibilities

* Unit testing
* Fast execution in monorepo context
* Native TypeScript support
* Integration with Vite ecosystem

---

## Playwright

Playwright is used for end-to-end testing.

### Responsibilities

* Web application testing
* UI interaction validation
* Regression testing
* Cross-browser verification

Playwright tests primarily target `apps/web`.

---

# Architecture Constraints

The technology stack must respect the following constraints:

## Framework Independence of Core Logic

Domain logic must not depend on SvelteKit, Tauri, or any UI framework.

---

## Platform Separation

Web and desktop implementations must remain independent at the application layer while sharing underlying packages.

---

## Rust Boundary Limitation

Rust is restricted to system-level responsibilities inside Tauri.

It must not become a second domain layer.

---

## Tooling Consistency

All tools must operate within the monorepo context and integrate with PNPM and TurboRepo.

---

# Performance Strategy

The stack is designed to optimize:

* Cold start performance (Tauri + SvelteKit compilation)
* Incremental builds (TurboRepo caching)
* Dependency resolution (PNPM efficiency)
* Runtime performance (Svelte compiled output + minimal JS runtime)

---

# Security Considerations

* Tauri provides a restricted native surface.
* Rust backend reduces attack surface compared to Node/Electron.
* Strict dependency management reduces supply chain risks.
* CI enforces reproducible builds.

---

# Decision

Praxis adopts a SvelteKit + TypeScript frontend architecture combined with a Tauri + Rust desktop runtime, orchestrated through a PNPM-managed monorepo with TurboRepo for build optimization.

Code quality is enforced through ESLint and Prettier initially, with a potential migration toward Biome in the future.

The stack prioritizes performance, maintainability, and cross-platform consistency while maintaining a strict separation between presentation, domain logic, and system-level concerns.
