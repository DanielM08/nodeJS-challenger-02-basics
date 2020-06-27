import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request{
  transactions: Transaction[];
  balance: Balance;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Request {
    return {
      "transactions" : this.transactionsRepository.all(),
      "balance" : this.transactionsRepository.getBalance()
    }
  }
}

export default CreateTransactionService;
