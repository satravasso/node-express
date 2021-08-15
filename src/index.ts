import express from 'express';

import { routerUser, routerPizza, routerProduct, routerCategory, routerMenu } from './router';

const defaultPort = 3000;
const app = express();

app.use(express.json());
app.use('/user', routerUser);
app.use('/pizza', routerPizza);
app.use('/product', routerProduct);
app.use('/category', routerCategory);
app.use('/menu', routerMenu);

app.listen(defaultPort, () => {
  console.log(`Porta ${defaultPort}`);
});
