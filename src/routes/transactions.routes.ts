import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';
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

  const balance = await transactionsRepository.getBalance();

  const transactions = await transactionsRepository.find();

  return response.json({
    transactions,
    balance
  });
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const{title,type,value,category=''} = request.body;

    const createTransactionService = new CreateTransactionService();
    const transaction = await createTransactionService.execute({
      title,type,value,category
    });

    return response.json({"id":transaction.id});

  } catch (error) {
    return response.status(error.statusCode).json({
      "message": error.message,
      "status": "error"
    });
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
