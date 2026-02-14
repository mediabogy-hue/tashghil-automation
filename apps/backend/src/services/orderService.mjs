import { requireRole, Roles } from '../auth/roles.mjs';
import { reserveStock } from '../domain/inventory.mjs';
import { splitOrderRevenue } from '../domain/commission.mjs';
import { postWalletCredit } from '../domain/wallet.mjs';

/**
 * In production, this service would use repositories + database transactions.
 * This implementation keeps logic pure for easy testing and later adapter wiring.
 */
export class OrderService {
  createPendingOrder({ actor, variant, requestedQty, unitRetailPrice, commissionPct }) {
    requireRole(actor, [Roles.DROPSHIPPER]);

    const remainingQty = reserveStock({
      availableQty: variant.availableQty,
      requestedQty,
    });

    const saleTotal = Math.round(unitRetailPrice * requestedQty * 100) / 100;
    const money = splitOrderRevenue({ saleTotal, commissionPct });

    return {
      order: {
        status: 'PENDING_PAYMENT',
        requestedQty,
        unitRetailPrice,
        saleTotal,
        commissionPct,
      },
      inventory: {
        variantId: variant.id,
        availableQty: remainingQty,
      },
      money,
    };
  }

  approveManualPayment({ actor, walletBalance, pendingCommission }) {
    requireRole(actor, [Roles.SUPER_ADMIN]);

    return {
      paymentStatus: 'VERIFIED',
      orderStatus: 'PAID',
      newWalletBalance: postWalletCredit({
        balance: walletBalance,
        amount: pendingCommission,
      }),
    };
  }
}
