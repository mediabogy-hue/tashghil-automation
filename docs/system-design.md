# Hybrid B2B Dropshipping Platform - System Design

## Goals
- Support Super Admin, Merchant, Dropshipper, Customer flows with strict RBAC.
- Keep inventory ownership and financial control centralized in platform.
- Scale to thousands of actors with modular services and async jobs.

## Modular Architecture
- **API Layer**: role-scoped endpoints, validation, auth, rate limiting.
- **Domain Services**:
  - Catalog Service (product onboarding and approval)
  - Inventory Service (reserve/release/adjust stock)
  - Order Service (state machine: pending → paid → processing → shipped → delivered)
  - Payment Service (manual proof verification now, gateway adapters later)
  - Wallet Service (commission ledger, pending/withdrawable balances)
  - Withdrawal Service (request + admin approval)
  - Notification Service (in-app, WhatsApp/SMS/email ready)
- **Data Layer**: relational DB with ACID transactions for orders and money movement.
- **Async Layer**: queue workers for low-stock alerts, payout processing, webhook retries.

## Key Workflows
1. Merchant submits product with variants, SKU, images and suggested price.
2. Super Admin reviews and sets approved retail and commission rules.
3. Approved products become visible to Dropshippers.
4. Dropshipper creates customer order; inventory is atomically reserved.
5. Customer pays manually and uploads proof.
6. Admin verifies proof; order marked paid; wallet credited with commission.
7. Dropshipper requests withdrawal; admin approves and payout recorded.

## Scalability Notes
- Stateless API instances behind load balancer.
- Redis for caching product listings and sessions.
- CDN for product and payment-proof assets.
- Partition large financial/audit tables by month when volume grows.

## Security Notes
- JWT + refresh token rotation.
- Password hashing (Argon2id/Bcrypt with proper work factor).
- Server-side validation for all price, commission, stock and payout fields.
- Immutable audit trail for financial events.
