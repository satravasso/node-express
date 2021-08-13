import { Request, Response } from 'express';
import { pizza, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPizzas(req: Request, res: Response<pizza[]>) {
  const flavor = req.query.flavor as string;
  let allPizzas;
  try {
    allPizzas = await prisma.pizza.findMany({
      where: {
        flavor: {
          contains: flavor,
        },
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }

  return res.status(200).json(allPizzas);
}

export async function getPizzaById(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);

  let pizza;
  try {
    pizza = await prisma.pizza.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }

  return res.status(200).json(pizza);
}

export async function createPizza(req: Request, res: Response<pizza>) {
  const pizza = req.body;
  let createdPizza;
  try {
    createdPizza = await prisma.pizza.create({
      data: pizza,
    });
  } catch (error) {
    if (error.code === 'P2002' || error.code === 'P2003') {
      return res.status(422).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }

  return res.status(201).json(createdPizza);
}

export async function updatePizza(req: Request, res: Response<pizza>) {
  const id = Number.parseInt(req.params.id);
  const pizza = req.body;

  let updated;
  try {
    updated = await prisma.pizza.update({
      where: { id },
      data: pizza,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }

  return res.status(200).json(updated);
}

export async function getTotalPizza(req: Request, res: Response) {
  let allPizzas;
  try {
    allPizzas = await prisma.pizza.findMany();
  } catch (error) {
    return res.status(500).json(error.message);
  }

  const valorTotal = allPizzas?.reduce((index, pizza) => {
    return index + (pizza?.value || 0);
  }, 0);

  return res.status(200).json(valorTotal);
}

export async function deletePizza(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);

  let deleted;
  try {
    const deleted = await prisma.pizza.delete({
      where: { id },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }

  return res.status(200).json(deleted);
}
