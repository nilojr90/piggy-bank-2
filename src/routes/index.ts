import { Router } from 'express';

import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);

routes.get('/', async (request, response) => {
  return response.json({"server":"Piggy Bank","version":"0.2.0"});
});

export default routes;
