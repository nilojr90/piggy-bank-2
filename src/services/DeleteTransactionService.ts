import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';


class DeleteTransactionService {
  public async execute(id:string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    await transactionsRepository.findOneOrFail({
      id
    }).catch(() => {
      throw new AppError("Id não existe.");
    });

    transactionsRepository.delete({
      id
    });
  }
}

export default DeleteTransactionService;
