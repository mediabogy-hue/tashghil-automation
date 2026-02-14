# Hybrid B2B Dropshipping Platform (Foundation)

This repository now contains a production-oriented foundation for a **Hybrid B2B Dropshipping Platform** with:
- Merchant-owned product onboarding (admin approval required)
- Dropshipper sales with configurable commission
- Manual payment verification flow
- Wallet + withdrawals + financial auditability
- Strict role-based boundaries: Super Admin, Merchant, Dropshipper, Customer

## Repository Structure
- `apps/backend/src/auth`: role and authorization utilities
- `apps/backend/src/domain`: core business rules (commission, inventory, wallet)
- `apps/backend/src/services`: orchestration logic (order and payment approval path)
- `apps/backend/src/api`: minimal HTTP surface for health and extensibility
- `apps/backend/tests`: unit tests for critical business invariants
- `database/schema.sql`: relational schema for operational + financial correctness
- `docs/system-design.md`: architecture and scaling blueprint
- `docs/api-contract.yaml`: initial OpenAPI contract for role-specific endpoints

## Why this is production-ready as a base
- Business-critical rules are modularized and testable.
- Financial actions are designed around immutable wallet transactions + audit logs.
- Data model supports lean manual payments today and gateway integrations later.
- Architecture is ready for horizontal scaling and future multi-vendor marketplace evolution.

## Run tests
```bash
node --test apps/backend/tests/domain.test.mjs
```
