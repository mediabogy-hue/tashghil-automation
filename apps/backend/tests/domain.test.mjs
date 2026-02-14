import test from 'node:test';
import assert from 'node:assert/strict';
import { splitOrderRevenue } from '../src/domain/commission.mjs';
import { reserveStock } from '../src/domain/inventory.mjs';
import { postWalletCredit, requestWithdrawal } from '../src/domain/wallet.mjs';
import { OrderService } from '../src/services/orderService.mjs';
import { Roles } from '../src/auth/roles.mjs';

test('splitOrderRevenue computes platform and dropshipper share', () => {
  const result = splitOrderRevenue({ saleTotal: 1000, commissionPct: 15 });
  assert.equal(result.dropshipperCommission, 150);
  assert.equal(result.platformGross, 850);
});

test('reserveStock prevents overselling', () => {
  assert.equal(reserveStock({ availableQty: 20, requestedQty: 5 }), 15);
  assert.throws(
    () => reserveStock({ availableQty: 2, requestedQty: 5 }),
    /Insufficient stock/
  );
});

test('wallet supports credit and withdrawal validation', () => {
  assert.equal(postWalletCredit({ balance: 100, amount: 25.5 }), 125.5);
  assert.equal(requestWithdrawal({ withdrawableBalance: 125.5, amount: 100 }), 25.5);
  assert.throws(
    () => requestWithdrawal({ withdrawableBalance: 10, amount: 15 }),
    /exceeds/
  );
});

test('order service enforces role and updates pending order details', () => {
  const service = new OrderService();
  const result = service.createPendingOrder({
    actor: { id: 'd1', role: Roles.DROPSHIPPER },
    variant: { id: 'v1', availableQty: 8 },
    requestedQty: 3,
    unitRetailPrice: 200,
    commissionPct: 10,
  });

  assert.equal(result.order.status, 'PENDING_PAYMENT');
  assert.equal(result.order.saleTotal, 600);
  assert.equal(result.inventory.availableQty, 5);
  assert.equal(result.money.dropshipperCommission, 60);
});
