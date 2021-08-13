import express from 'express';

import { routerUser, routerPizza, routerProduct, routerCategory, routerMenu } from './router/routes';

const defaultPort = 3000;
const app = express();

app.use(express.json());
app.use('/user', routerUser);
app.use('/pizza', routerPizza);
app.use('/product', routerProduct);
app.use('/category', routerCategory);
app.use('/menu', routerMenu);

// app.use(function (err : Error, req, res, next) {
//   res.status(err.httpStatusCode || 500).json({code: err.code, message: err.message})
// });
app.listen(defaultPort, () => {
  console.log(`Porta ${defaultPort}`);
});
