import { Request, Response } from 'express';
import { createSession, findSessions } from '../services/session.service';
import { validateUserCredentials } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';

export async function createSessionHandler(
  request: Request,
  response: Response
) {
  const validatedUser = await validateUserCredentials(request.body);

  if (!validatedUser) {
    return response
      .status(401)
      .json({ error: 'Unauthorized: Invalid password or email' });
  }

  const createdSession = await createSession(
    validatedUser._id,
    request.get('user-agent')
  );

  const accessToken = signJwt(
    { user: validatedUser._id, session: createdSession._id },
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  const refreshToken = signJwt(
    {
      user: validatedUser._id,
      session: createdSession._id,
    },
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );

  return response
    .status(201)
    .json({ session: createdSession, accessToken, refreshToken });
}

export async function findSessionHandler(request: Request, response: Response) {
  // Get user id from the locals
  // Look for a valid session for the specified user
  // Return the sessions
}

export async function findSessionsHandler(
  request: Request,
  response: Response
) {
  const sessionsFound = await findSessions({});

  if (!sessionsFound) {
    return response.status(404).json({ error: 'Sessions not found' });
  }

  return response.status(200).json(sessionsFound);
}

export async function deleteSessionHandler(
  request: Request,
  response: Response
) {
  // Get the user id from the locals
  // Update the actual session to be not valid
  // Return the token
}
