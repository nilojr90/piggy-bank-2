import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";

import Transaction from "../models/Transaction";
import TransactionsRepository from "../repositories/TransactionsRepository";
import CreateCategoryService from "./CreateCategoryService";

interface Request {
  title: string;
  type: "income" | "outcome";
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    if (type == "outcome") {
      const balance = await transactionRepository.getBalance();
      if (value > balance.total) {
        throw new AppError("Saldo insuficiente", 400);
      }
    }

    const createCategoryService = new CreateCategoryService();
    const myCategory = await createCategoryService.execute(category);

    const transaction = transactionRepository.create({
      title,
      type,
      value: value.toString(),
      category: myCategory,
    });

    return await transactionRepository.save(transaction).catch(() => {
      throw new AppError("Falha ao salvar transação", 500);
    });
  }
}

export default CreateTransactionService;
