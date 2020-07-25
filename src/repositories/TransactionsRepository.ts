import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

class Balance {
  income: number;
  outcome: number;
  total: number;

  constructor(income = 0.0, outcome = 0.0) {
    this.income = income == NaN ? 0.0 : income;
    this.outcome = outcome == NaN ? 0.0 : outcome;
    this.total = this.income - this.outcome;
  }
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const incomeTransactions = this.filterByType(transactions, "income");

    let income = 0.0;
    if (incomeTransactions.length > 0) {
      income = incomeTransactions.reduce(this.reducerSum, new Transaction()).getValue();
    }

    const outcomeTransactions = this.filterByType(transactions, "outcome");
    let outcome = 0.0;
    if (outcomeTransactions.length > 0) {
      outcome =
        outcomeTransactions.reduce(this.reducerSum, new Transaction()).getValue();
    }

    return new Balance(income, outcome);
  }

  private reducerSum(total: Transaction, currentValue: Transaction): Transaction {
    total.setValue(total.getValue() + currentValue.getValue());
    return total;
  }

  private filterByType(transactions: Transaction[], type: "income" | "outcome"): Transaction[] {
      return transactions.filter(t=>t.type==type);
  }
}

export default TransactionsRepository;
