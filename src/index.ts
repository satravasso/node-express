import express from 'express';

import { routerUser, routerPizza, routerProduct } from './router/routes';

const defaultPort = 3000;
const app = express();

app.use(express.json());
app.use('/user', routerUser);
app.use('/pizza', routerPizza);
app.use('/product', routerProduct);

app.listen(defaultPort, () => {
  console.log(`Porta ${defaultPort}`);
});
