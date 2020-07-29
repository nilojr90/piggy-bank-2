import { Router } from "express";
import { getCustomRepository } from "typeorm";
import multer from "multer";

import TransactionsRepository from "../repositories/TransactionsRepository";
import Transaction from "../models/Transaction";
import CreateTransactionService from "../services/CreateTransactionService";
import DeleteTransactionService from "../services/DeleteTransactionService";
import ImportTransactionsService from "../services/ImportTransactionsService";
import uploadConfig from "../config/upload";

const transactionsRouter = Router();
const upload = multer(uploadConfig);

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

transactionsRouter.get("/", async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const balance = await transactionsRepository.getBalance();

  const transactions = await transactionsRepository.find();

  return response.json({
    transactions,
    balance,
  });
});

transactionsRouter.post("/", async (request, response) => {
  try {
    const { title, type, value, category = "" } = request.body;

    const createTransactionService = new CreateTransactionService();
    const transaction = await createTransactionService.execute({
      title,
      type,
      value,
      category,
    });

    return response.json({ id: transaction.id });
  } catch (error) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: "error",
    });
  }
});

transactionsRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteTransactionService = new DeleteTransactionService();

    deleteTransactionService.execute(id);

    return response.status(204).send();
  } catch (error) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: "error",
    });
  }
});

transactionsRouter.post(
  "/import",
  upload.single("file"),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();

    const transactions = await importTransactionsService.execute(
      request.file.path
    );

    return response.json(transactions);
  }
);

export default transactionsRouter;
