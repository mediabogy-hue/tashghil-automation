export class InventoryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InventoryError';
  }
}

export const reserveStock = ({ availableQty, requestedQty }) => {
  if (requestedQty <= 0) throw new InventoryError('requestedQty must be > 0');
  if (availableQty < requestedQty) {
    throw new InventoryError('Insufficient stock, cannot reserve');
  }
  return availableQty - requestedQty;
};

export const releaseStock = ({ availableQty, releaseQty }) => {
  if (releaseQty <= 0) throw new InventoryError('releaseQty must be > 0');
  return availableQty + releaseQty;
};
