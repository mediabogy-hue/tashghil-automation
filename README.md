# Hybrid B2B Dropshipping Platform (Launch-Ready Foundation)

This repository contains a production-oriented foundation for a **Hybrid B2B Dropshipping Platform** with:
- Merchant-owned product onboarding (admin approval required)
- Dropshipper sales with configurable commission
- Manual payment verification flow
- Wallet + withdrawals + financial auditability
- Strict role-based boundaries: Super Admin, Merchant, Dropshipper, Customer

## Repository Structure
- `apps/backend/src/auth`: role and authorization utilities
- `apps/backend/src/domain`: core business rules (commission, inventory, wallet)
- `apps/backend/src/services`: orchestration logic (order + payment approval path)
- `apps/backend/src/api`: HTTP server + health/readiness endpoints
- `apps/backend/tests`: unit tests for critical business invariants
- `database/schema.sql`: relational schema for operational + financial correctness
- `docs/system-design.md`: architecture and scaling blueprint
- `docs/api-contract.yaml`: initial OpenAPI contract for role-specific endpoints
- `scripts/launch.sh`: one-command local launch using Docker Compose

## Quick Launch (إطلاق سريع)
### Option A: Docker (recommended)
```bash
cp .env.example .env
./scripts/launch.sh
```

After launch:
- API Health: `http://localhost:8080/health`
- API Readiness: `http://localhost:8080/ready`
- Roles endpoint: `http://localhost:8080/roles`

### Option B: Run API directly with Node
```bash
npm run start
```

## Validation Commands
```bash
npm run check
npm run test
```

## Production-Readiness Notes
- Business-critical rules are modularized and testable.
- Financial actions are designed around wallet transactions + audit logs.
- Schema supports lean manual payments now and gateway integrations later.
- App is containerized and ready for orchestration.
