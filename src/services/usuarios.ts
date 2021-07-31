import { Request, Response } from 'express';

type User = {
  login: string;
  senha: string;
  id: number;
};

let users: User[];

users = [
  {
    login: 'Ana',
    senha: 'senha12',
    id: 1,
  },
  {
    login: 'Antonio',
    senha: 'senha15',
    id: 2,
  },
];

export function getUsers(req: Request, res: Response) {
  const filterLogin = req.query.filterLogin as string;

  const filteredUser = users.filter((user) => user.login.toUpperCase() === filterLogin?.toUpperCase());

  if (req.query.filterLogin) {
    res.status(200).json(filteredUser);
  } else {
    res.status(200).json(users);
  }
}

export function getUserById(req: Request, res: Response<User>) {
  const { id } = req.params;

  const filterUser = users.filter((user) => user.id === Number(id));

  if (filterUser) {
    res.status(200).json(filterUser[0]);
  } else {
    res.status(404).json();
  }
}

export function createUser(req: Request, res: Response<User>) {
  const user = req.body;

  users.push(user);

  return res.status(200).json(user);
}

export function updateUser(req: Request, res: Response<User>) {
  const user = req.body;

  users = users.map((item) => {
    if (item.id === user.id) {
      item = user;
    }
    return item;
  });
  res.status(200).json(user);
}

export function deteleUser(req: Request, res: Response) {
  const { id } = req.params;

  const newArray = users.filter((user) => user.id !== Number(id));
  users = newArray;

  if (newArray) {
    res.status(200).json('deleted');
  } else {
    res.status(404).json();
  }
}
