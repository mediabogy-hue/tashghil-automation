import { ValidationError } from './commission.mjs';

export const postWalletCredit = ({ balance, amount }) => {
  if (amount <= 0) throw new ValidationError('Credit amount must be > 0');
  return Math.round((balance + amount) * 100) / 100;
};

export const requestWithdrawal = ({ withdrawableBalance, amount }) => {
  if (amount <= 0) throw new ValidationError('Withdrawal amount must be > 0');
  if (amount > withdrawableBalance) {
    throw new ValidationError('Withdrawal exceeds withdrawable balance');
  }
  return Math.round((withdrawableBalance - amount) * 100) / 100;
};
