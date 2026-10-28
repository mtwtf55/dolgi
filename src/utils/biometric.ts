const CHALLENGE_LENGTH = 32;
const USER_ID_LENGTH = 16;
const BIOMETRIC_TIMEOUT_MS = 60000;
const ES256_ALGORITHM = -7;
const RS256_ALGORITHM = -257;

const getRandomBytes = (length: number) => crypto.getRandomValues(new Uint8Array(length));

const bufferToBase64 = (buffer: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));

const base64ToBuffer = (base64: string) =>
  Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));

export const isBiometricAvailable = async () => {
  if (!window.isSecureContext || !window.PublicKeyCredential) return false;

  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
};

export const registerBiometric = async () => {
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: getRandomBytes(CHALLENGE_LENGTH),
      rp: { name: 'Долги' },
      user: { id: getRandomBytes(USER_ID_LENGTH), name: 'Долги', displayName: 'Долги' },
      pubKeyCredParams: [
        { type: 'public-key', alg: ES256_ALGORITHM },
        { type: 'public-key', alg: RS256_ALGORITHM },
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'discouraged',
      },
      timeout: BIOMETRIC_TIMEOUT_MS,
    },
  });

  if (!(credential instanceof PublicKeyCredential)) {
    throw new Error('Не удалось создать ключ доступа');
  }

  return bufferToBase64(credential.rawId);
};

export const verifyBiometric = async (credentialId: string) => {
  try {
    const credential = await navigator.credentials.get({
      publicKey: {
        challenge: getRandomBytes(CHALLENGE_LENGTH),
        allowCredentials: [{ type: 'public-key', id: base64ToBuffer(credentialId) }],
        userVerification: 'required',
        timeout: BIOMETRIC_TIMEOUT_MS,
      },
    });

    return credential instanceof PublicKeyCredential;
  } catch {
    return false;
  }
};
