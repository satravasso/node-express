import { Request, Response } from 'express';
import { pizza, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPizzas(req: Request, res: Response<pizza[]>) {
  const flavor = req.query.flavor as string;

  const allPizzas: pizza[] = await prisma.pizza.findMany({
    where: {
      flavor: {
        contains: flavor,
      },
    },
  });

  res.status(200).json(allPizzas);
}

export async function getPizzaById(req: Request, res: Response<pizza[]>) {
  const id = Number.parseInt(req.params.id);

  const allPizzas: pizza[] = await prisma.pizza.findMany({
    where: {
      id,
    },
  });

  res.status(200).json(allPizzas);
}

export async function createPizza(req: Request, res: Response<pizza>) {
  const pizza = req.body;

  await prisma.pizza.create({
    data: pizza,
  });

  return res.status(200).json(pizza);
}

export async function updatePizza(req: Request, res: Response<pizza>) {
  const id = Number.parseInt(req.params.id);
  const pizza = req.body;

  const updated = await prisma.pizza.update({
    where: { id },
    data: pizza,
  });

  res.status(200).json(updated);
}

export async function getTotalPizza(req: Request, res: Response) {
  const allPizzas: pizza[] = await prisma.pizza.findMany();
  const valorTotal = allPizzas.reduce((index, pizza) => {
    return index + (pizza?.value || 0);
  }, 0);

  res.status(200).json(valorTotal);
}

export async function deletePizza(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);

  const deleted = await prisma.pizza.delete({
    where: { id },
  });

  res.status(200).json(deleted);
}
