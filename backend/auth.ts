import { Request, Response } from 'express';

import * as JWT from 'jsonwebtoken';

import { User, users } from './users';
import { API_CONFIG } from './api.config';

export const handleAuthentication = (req: Request, resp: Response) => {
  const user: User = req.body;

  if (isValid(user)) {
    const dbUser: User = users[user.email];

    const token = JWT.sign({
      sub: dbUser.email,
      iss: 'meat-app'
    }, API_CONFIG.signature);

    resp.status(200).json({
      name: dbUser.name,
      email: dbUser.email,
      accessToken: token
    });
  } else {
    resp.status(403).json({message: 'Dados inválidos.'});
  }
};

function isValid(user: User): boolean {
  if (!user) {
    return false;
  }

  const dbUser: User = users[user.email];

  return dbUser !== undefined && dbUser.matches(user);
}
