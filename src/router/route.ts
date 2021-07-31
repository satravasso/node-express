import express from 'express';
import { createPizza, deletePizza, getPizzaById, getPizzas, getTotalPizza, updatePizza } from '../services/pizza';

import { getUsers, getUserById, createUser, updateUser, deteleUser } from '../services/usuarios';

export const routerUser = express.Router();

routerUser.post('/', createUser);
routerUser.get('/', getUsers);
routerUser.get('/:id', getUserById);
routerUser.put('/:id', updateUser);
routerUser.delete('/:id', deteleUser);

export const routerPizza = express.Router();

routerPizza.post('/', createPizza);
routerPizza.get('/', getPizzas);
routerPizza.get('/totalPizza', getTotalPizza);
routerPizza.get('/:id', getPizzaById);
routerPizza.put('/:id', updatePizza);
routerPizza.delete('/:id', deletePizza);
