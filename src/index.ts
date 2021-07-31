import express from 'express';

import { routerUser, routerPizza } from './router/route';

const defaultPort = 3000;
const app = express();

app.use(express.json());
app.use('/user', routerUser);
app.use('/pizza', routerPizza);

app.listen(defaultPort, () => {
  console.log(`Porta ${defaultPort}`);
});
