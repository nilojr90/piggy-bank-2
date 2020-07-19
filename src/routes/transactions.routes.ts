import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();


interface Balance{
  income: number,
  outcome: number,
  total: number
};

interface Response{
  transactions: Transaction[],
  balance: Balance
}


transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const balance = transactionsRepository.getBalance();

  const transactions = transactionsRepository.find();

  return response.json({
    transactions,
    balance
  });
});

transactionsRouter.post('/', async (request, response) => {
  // TODO
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
