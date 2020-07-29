import Transaction from '../models/Transaction';
import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import CreateTransactionService from './CreateTransactionService';
import AppError from '../errors/AppError';

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    try {
      const readCSVStream
        = fs.createReadStream(path.resolve(filePath));

      const parseStream = csvParse({
        from_line: 2,
        ltrim: true,
        rtrim: true,
      });

      const parseCSV = readCSVStream.pipe(parseStream);

      const lines: any[] | PromiseLike<any[]> = [];

      parseCSV.on('data', line => {
        lines.push(line);
      });

      await new Promise(resolve => {
        parseCSV.on('end', resolve);
      });

      const createTransactionService = new CreateTransactionService();

      let importedTransactions = [];

      for (let i = 0; i !== lines.length; ++i) {
        let line = lines[i];
        const transaction = await createTransactionService.execute({
          title: line[0] as string,
          type: line[1] as 'income' | 'outcome',
          value: parseFloat(line[2]),
          category: line[3] as string

        });
        importedTransactions.push(transaction);
      }

      //Delete temp file after use (asyncronous).
      fs.unlink(filePath,()=>{});

      return importedTransactions;
    } catch (error) {
      throw new AppError("Falha na importação", 500);
    }

  }
}

export default ImportTransactionsService;


