# Project Context

---

# Overview

Praxis is an open-source educational platform designed to help people learn technical and creative disciplines through guided practice, structured knowledge, and project-oriented learning.

Rather than acting as a code playground, online judge, or automated learning environment, Praxis serves as a curated knowledge base that accompanies learners while they work in their own tools, editors, operating systems, and development environments.

The project draws inspiration from traditional knowledge software such as Microsoft Encarta, modern developer documentation, and guided learning experiences similar to project-based educational platforms.

Its primary goal is to provide a practical learning experience without requiring permanent internet access, subscriptions, cloud services, or proprietary ecosystems.

---

# Vision

Praxis aims to become a community-driven educational ecosystem where knowledge can be created, translated, reviewed, versioned, and distributed in a transparent and accessible way.

The platform should allow learners to:

* Study complete learning paths.
* Follow structured lessons.
* Solve guided problems.
* Build real projects independently.
* Learn using their own tools.
* Track progress locally.
* Access educational content without internet connectivity.

Long term, Praxis should support a growing collection of topics, languages, and educational resources while maintaining a consistent architecture and user experience.

---

# Problem Statement

Most modern educational platforms suffer from one or more of the following limitations:

* Permanent internet dependency.
* Closed and proprietary content.
* Subscription-based access.
* Vendor lock-in.
* Limited community participation.
* Heavy reliance on cloud infrastructure.
* Learning experiences disconnected from real-world tools.

Additionally, many programming education platforms encourage solving isolated exercises inside controlled browser environments instead of working within realistic development workflows.

This often creates a gap between completing exercises and building actual software.

Praxis seeks to reduce this gap by encouraging learners to work directly in their own environments while using the platform as guidance, reference material, and structured educational support.

---

# Core Principles

## Offline First

The platform must remain fully functional without internet connectivity.

Educational content, progress tracking, settings, and learning paths should be available locally.

Internet access should only enhance the experience through optional updates and future synchronization features.

---

## Open Source

All source code, content definitions, translations, and educational structures should be publicly accessible and auditable.

Community participation is considered a core requirement rather than an optional feature.

---

## Content as Code

Educational content should be stored as version-controlled files within the repository.

Courses, lessons, exercises, metadata, and translations should follow predictable and reviewable structures.

Changes to educational material should be reviewed through the same processes used for software development.

---

## Project-Based Learning

Praxis does not seek to replace the learner's development environment.

Instead, it provides guidance, explanations, challenges, examples, and project requirements that encourage learners to build solutions independently.

The platform prioritizes understanding, experimentation, and problem-solving over automated validation.

---

## Incremental Learning

Learning paths should be divided into small and focused lessons.

A lesson should generally be completable within approximately twenty minutes.

Each lesson should have a clear objective, practical examples, and actionable exercises.

---

## Accessibility

Educational resources should be available regardless of operating system, internet quality, geographic location, or economic limitations.

The platform should maintain low hardware requirements and efficient resource consumption.

---

# Target Audience

Praxis is intended for:

* Software developers.
* Computer science students.
* Self-taught learners.
* Open-source contributors.
* Technical professionals seeking structured learning.
* Individuals interested in practical skill development.

Although the initial focus may be software development topics, the architecture should remain flexible enough to support additional disciplines in the future.

---

# Scope

The initial versions of Praxis are responsible for:

* Content delivery.
* Lesson navigation.
* Progress tracking.
* Localization.
* Search and discovery.
* Educational resource management.
* Guided exercises and projects.

The initial versions are not responsible for:

* Cloud-based collaboration.
* Real-time multiplayer experiences.
* Browser-based code execution.
* Remote assessment systems.
* AI-generated educational content.
* Mandatory user accounts.

---

# Long-Term Direction

Praxis should evolve into a sustainable educational ecosystem composed of:

* Desktop applications.
* Web applications.
* Community-maintained content.
* Multiple language translations.
* Versioned educational releases.
* Optional synchronization services.

The architecture should allow future online capabilities without compromising the platform's offline-first foundations.

Every future feature should preserve the project's principles of openness, accessibility, transparency, and learner independence.

---

# Decision

Praxis will be developed as an offline-first, open-source, project-oriented educational platform that delivers structured knowledge and guided practice through version-controlled content distributed alongside the application.

The platform will prioritize learner autonomy, community contributions, multilingual support, and long-term maintainability over cloud-dependent educational experiences.
