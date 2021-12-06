import { NextFunction, Request, Response } from 'express';
import { findSessions } from '../services/session.service';
import {
  findUser,
  checkPasswordChangeAfterLogin,
} from '../services/user.service';
import { verifyJwt } from '../utils/jwt.utils';

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  let accessToken;

  // Get token from the request header and check if the user is logged in

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer')
  ) {
    accessToken = request.headers.authorization.split(' ')[1];
  }

  if (!accessToken) {
    return response
      .status(401)
      .json({ error: 'You are not logged in! Please log in to get access.' });
  }

  // Verify token and return the decoded payload only if it's valid

  const decodedToken = verifyJwt(accessToken);

  if (!decodedToken.isValid) {
    return response
      .status(401)
      .json({ error: 'Invalid token! Please log in again.' });
  }

  // Check if the user and session still exists

  const foundUser =
    decodedToken.payload &&
    (await findUser({ _id: decodedToken.payload.user }));

  if (!foundUser) {
    return response.status(401).json({
      error: 'The user belonging to this token does not longer exists.',
    });
  }

  const activeSession =
    decodedToken.payload &&
    (await findSessions({ _id: decodedToken.payload.session }));

  // Check if user changed password after the token was issued

  const passwordWasChanged = await checkPasswordChangeAfterLogin(
    foundUser._id,
    decodedToken.payload.iat
  );

  if (passwordWasChanged) {
    return response.status(401).json({
      error: 'User recently changed his password. Please, log in again.',
    });
  }

  // Grant access to protected route

  request.session = activeSession._id;
  request.user = foundUser;

  return next();
}
