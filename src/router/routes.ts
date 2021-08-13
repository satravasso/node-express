import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../services/order_restaurant/category';
import { createMenu, deleteMenu, getMenuById, getMenus, updateMenu } from '../services/order_restaurant/menu';
import { createPizza, deletePizza, getPizzaById, getPizzas, getTotalPizza, updatePizza } from '../services/pizza';
import { createProduct, deleteProduct, getAllProducts, sellProducts, updateProduct } from '../services/product';

import { getUsers, getUserById, createUser, updateUser, deteleUser } from '../services/user';

const routerUser = express.Router();
const routerPizza = express.Router();
const routerProduct = express.Router();
const routerCategory = express.Router();
const routerMenu = express.Router();

function createRout() {}

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

routerCategory.post('/', createCategory);
routerCategory.get('/', getCategories);
routerCategory.get('/:id', getCategoryById);
routerCategory.put('/:id', updateCategory);
routerCategory.delete('/:id', deleteCategory);

routerMenu.post('/', createMenu);
routerMenu.get('/', getMenus);
routerMenu.get('/:id', getMenuById);
routerMenu.put('/:id', updateMenu);
routerMenu.delete('/:id', deleteMenu);

export { routerUser, routerPizza, routerProduct, routerCategory, routerMenu };
