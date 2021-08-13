import { NextFunction, Request, Response } from 'express';
import { order, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOrders(req: Request, res: Response<order[]>) {
  const name = req.query.name as string;
  let allorders;
  try {
    allorders = await prisma.order.findMany();
  } catch (error) {
    return res.status(500).json(error.message);
  }

  return res.status(200).json(allorders);
}

export async function getOrderById(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);
  let order;
  try {
    order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }

  return res.status(200).json(order);
}

export async function createOrder(req: Request, res: Response<order>) {
  const order = req.body;
  let createdorder;
  try {
    createdorder = await prisma.order.create({
      data: order,
    });
  } catch (error) {
    if (error.code === 'P2002' || error.code === 'P2003') {
      return res.status(422).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }

  return res.status(201).json(order);
}

export async function updateorder(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  const order = req.body;

  let updated;
  try {
    updated = await prisma.order.update({
      where: { id },
      data: order,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }

  return res.status(201).json(updated);
}