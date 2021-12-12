import { Request, Response } from 'express';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
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
  const sessionId = request.params.sessionId;

  // Look for a valid session for the specified user
  const foundSession = await findSessions({ _id: sessionId });

  // Return the sessions
  response.status(200).json(foundSession);
}

export async function findSessionsHandler(
  request: Request,
  response: Response
) {
  const foundSessions = await findSessions({});

  if (!foundSessions) {
    return response.status(404).json({ error: 'Sessions not found' });
  }

  return response.status(200).json(foundSessions);
}

export async function deleteSessionHandler(
  request: Request,
  response: Response
) {
  // Get the logged user and session ids from the locals
  const loggedSessionId = request.session;
  const loggedUserId = request.user;

  // Update the actual session to be not valid (logout)
  const updatedSession = await updateSession(
    { _id: loggedSessionId, user: loggedUserId },
    { valid: false }
  );

  request.user = undefined;
  request.session = undefined;

  // Return the tokens
  return response
    .status(200)
    .json({ session: updatedSession, accessToken: null, refreshToken: null });
}
