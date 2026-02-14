export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const computeCommission = ({ saleTotal, commissionPct }) => {
  if (saleTotal < 0) throw new ValidationError('saleTotal must be >= 0');
  if (commissionPct < 0 || commissionPct > 100) {
    throw new ValidationError('commissionPct must be between 0 and 100');
  }

  const raw = (saleTotal * commissionPct) / 100;
  return Math.round(raw * 100) / 100;
};

export const splitOrderRevenue = ({ saleTotal, commissionPct }) => {
  const dropshipperCommission = computeCommission({ saleTotal, commissionPct });
  const platformGross = Math.round((saleTotal - dropshipperCommission) * 100) / 100;
  return { dropshipperCommission, platformGross };
};
