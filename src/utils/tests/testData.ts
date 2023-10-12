import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

const MOCK_KID = 'testAuthKid';

export const { privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

const AUTH_JWT_PAYLOAD = {
  iat: Date.now(),
  jti: 'jti',
  sid: 'sid'
};

export const AUTH_JWT = jwt.sign(AUTH_JWT_PAYLOAD, privateKey, {
  keyid: MOCK_KID,
  algorithm: 'RS256',
  issuer: process.env.ISSUER_BASE_URL,
  audience: process.env.AUDIENCE
});
