import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('tokenPrivateKey');
const publicKey = config.get<string>('tokenPublicKey');

export function signJwt(
  payload: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(token: string) {
  try {
    const payload: any = jwt.verify(token, publicKey);

    return {
      isValid: true,
      isExpired: false,
      payload,
    };
  } catch (error: any) {
    return {
      isValid: false,
      isExpired: true,
      payload: null,
    };
  }
}
