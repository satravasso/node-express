import { Request, Response } from 'express';
import { PrismaClient, user } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response) {
  const login = req.query.login as string;

  const allUsers: user[] = await prisma.user.findMany({
    where: {
      login: {
        contains: login,
      },
    },
  });

  res.status(200).json(allUsers);
}

export async function getUserById(req: Request, res: Response<user[]>) {
  const id = Number.parseInt(req.params.id);

  const allUsers = await prisma.user.findMany({
    where: {
      id,
    },
  });

  res.status(200).json(allUsers);
}

export async function createUser(req: Request, res: Response<user>) {
  const user: user = req.body;

  await prisma.user.create({
    data: user,
  });
  return res.status(200).json(user);
}

export async function updateUser(req: Request, res: Response<user>) {
  const id = Number.parseInt(req.params.id);
  const user = req.body;

  const updated = await prisma.user.update({
    where: { id },
    data: user,
  });

  res.status(200).json(updated);
}

export async function deteleUser(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);

  const deleted = await prisma.user.delete({
    where: { id },
  });

  res.status(200).json(deleted);
}
