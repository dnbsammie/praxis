# Architecture Decision Records (ADRs)

This folder records the significant architecture decisions of Praxis: what we chose, why, and what we gave up.

## How it works

- One decision per file, named `NNNN-short-title.md` (e.g. `002-use-sqlite-for-local-storage.md`).
- Copy [`000-template.md`](000-template.md) to start a new ADR. Numbers are sequential and never reused.
- ADRs are immutable once `Accepted`. To change a decision, write a new ADR that supersedes the old one and update the old one's status to `Superseded by ADR-NNNN`.
- Open a pull request for each ADR so the discussion is visible to contributors.

## Statuses

`Proposed` → `Accepted` → (`Deprecated` | `Superseded by ADR-NNNN`) · or `Rejected`

## Index

| ADR | Title | Status |
|-----|-------|--------|
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions | Accepted |
