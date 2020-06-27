import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactiontDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    }
  }

  public all(): Transaction[] {

    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactiontDTO): Transaction {
    if(type === 'outcome'){
      if(value > this.balance.total)
        throw Error('Account balance is insufficient');
      else
        this.balance.outcome += value;
        this.balance.total -= value;
    }
    else{
      this.balance.income += value;
      this.balance.total += value;
    }

    const transaction = new Transaction({title, type, value});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
