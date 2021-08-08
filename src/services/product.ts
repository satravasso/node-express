import { Request, Response } from 'express';
import { product, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllProducts(req: Request, res: Response<product[]>) {
  const name = req.query.name as string;
  const category = req.query.category as string;

  const allProducts: product[] = await prisma.product.findMany({
    where: {
      name: {
        contains: name,
      },
      category: category,
    },
  });

  res.status(200).json(allProducts);
}
export async function createProduct(req: Request, res: Response<product>) {
  const product = req.body;

  await prisma.product.create({
    data: product,
  });

  return res.status(200).json(product);
}

export async function updateProduct(req: Request, res: Response<product>) {
  const id = Number.parseInt(req.params.id);
  const product = req.body;

  const updated = await prisma.product.update({
    where: { id },
    data: product,
  });

  res.status(200).json(updated);
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);

  const deleted = await prisma.product.delete({
    where: { id },
  });

  res.status(200).json(deleted);
}

export async function sellProducts(req: Request, res: Response) {
  const products = req.body;

  let updated = products.map(async (item: { id: number; quantityItem: number }) => {
    const prod_qnt = await prisma.product.findUnique({
      where: { id: item.id },
    });

    const qntFinal = (prod_qnt?.quantity || 0) - item.quantityItem;

    return await prisma.product.update({
      where: { id: item.id },
      data: { quantity: qntFinal },
    });
  });

  res.status(200).json(updated);
}

export async function addProduct(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);

  const deleted = await prisma.product.delete({
    where: { id },
  });

  res.status(200).json(deleted);
}
