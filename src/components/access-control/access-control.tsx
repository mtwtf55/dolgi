import {
  getBiometricCredentialId,
  isPasswordCorrect,
  useSettingsStore,
} from '@/stores/use-settings-store';
import { hashPassword, verifyBiometric } from '@/utils';
import { Button } from '@ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { FingerprintIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export const AccessControl = () => {
  const isPasswordSet = useSettingsStore((state) => state.setPassword);
  const isBiometricEnabled = useSettingsStore((state) => state.useBiometric);
  const [isShowOverlay, setIsShowOverlay] = useState(isPasswordSet);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const isBiometricRequestedRef = useRef(false);
  const biometricCredentialId = isBiometricEnabled ? getBiometricCredentialId() : null;

  const requestBiometric = async () => {
    if (!biometricCredentialId) return;

    const isVerified = await verifyBiometric(biometricCredentialId);
    if (isVerified) setIsShowOverlay(false);
  };

  useEffect(() => {
    if (!isShowOverlay || !biometricCredentialId || isBiometricRequestedRef.current) return;

    isBiometricRequestedRef.current = true;
    verifyBiometric(biometricCredentialId).then((isVerified) => {
      if (isVerified) setIsShowOverlay(false);
    });
  }, [isShowOverlay, biometricCredentialId]);

  const handleComplete = async (password: string) => {
    try {
      const hash = await hashPassword(password);
      const isCorrect = isPasswordCorrect(hash);

      if (!isCorrect) {
        setIsPasswordInvalid(true);
        return;
      }

      setIsShowOverlay(false);
    } catch (error) {
      toast.error('Ошибка проверки пароля. Попробуйте позже');
    }
  };

  const handleChange = (value: string) => {
    if (value.length < 4) setIsPasswordInvalid(false);
  };

  if (isShowOverlay) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/40 backdrop-blur-xs animate-in fade-in duration-300">
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          autoFocus={!biometricCredentialId}
          onComplete={handleComplete}
          onChange={handleChange}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} aria-invalid={isPasswordInvalid} />
            <InputOTPSlot index={1} aria-invalid={isPasswordInvalid} />
            <InputOTPSlot index={2} aria-invalid={isPasswordInvalid} />
            <InputOTPSlot index={3} aria-invalid={isPasswordInvalid} />
          </InputOTPGroup>
        </InputOTP>
        {biometricCredentialId && (
          <Button
            variant="ghost"
            size="icon"
            className="size-14"
            aria-label="Войти по отпечатку"
            onClick={requestBiometric}
          >
            <FingerprintIcon className="size-8" />
          </Button>
        )}
      </div>
    );
  }

  return null;
};
