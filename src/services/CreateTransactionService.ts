import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: CreateTransactionRequest): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (balance.total < value && type === 'outcome') {
      throw Error('not enough balance');
    }

    this.transactionsRepository.create({ title, value, type });
    return new Transaction({ title, value, type });
  }
}

export default CreateTransactionService;
