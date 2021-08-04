import express from 'express';
import { createPizza, deletePizza, getPizzaById, getPizzas, getTotalPizza, updatePizza } from '../services/pizza';
import { createProduct, deleteProduct, getAllProducts, sellProducts, updateProduct } from '../services/product';

import { getUsers, getUserById, createUser, updateUser, deteleUser } from '../services/user';

const routerUser = express.Router();
const routerPizza = express.Router();
const routerProduct = express.Router();

routerUser.post('/', createUser);
routerUser.get('/', getUsers);
routerUser.get('/:id', getUserById);
routerUser.put('/:id', updateUser);
routerUser.delete('/:id', deteleUser);

routerPizza.post('/', createPizza);
routerPizza.get('/', getPizzas);
routerPizza.get('/totalPizza', getTotalPizza);
routerPizza.get('/:id', getPizzaById);
routerPizza.put('/:id', updatePizza);
routerPizza.delete('/:id', deletePizza);

routerProduct.post('/', createProduct);
routerProduct.get('/', getAllProducts);
routerProduct.put('/:id', updateProduct);
routerProduct.delete('/:id', deleteProduct);
routerProduct.post('/sellProducts', sellProducts);

export { routerUser, routerPizza, routerProduct };
