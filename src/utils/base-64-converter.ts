import { LoginPayload } from 'src/auth/dtos/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const parts = authorization.split('.');

  if (parts.length < 3 || !parts[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(parts[1], 'base64').toString('ascii'));
};
