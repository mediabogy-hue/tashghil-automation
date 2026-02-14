export const Roles = Object.freeze({
  SUPER_ADMIN: 'SUPER_ADMIN',
  MERCHANT: 'MERCHANT',
  DROPSHIPPER: 'DROPSHIPPER',
  CUSTOMER: 'CUSTOMER',
});

export class AuthorizationError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export const requireRole = (actor, allowedRoles) => {
  if (!actor || !allowedRoles.includes(actor.role)) {
    throw new AuthorizationError('Access denied for this role');
  }
};
