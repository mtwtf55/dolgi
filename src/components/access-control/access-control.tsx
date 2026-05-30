import { isPasswordCorrect, useSettingsStore } from '@/stores/use-settings-store';
import { hashPassword } from '@/utils';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState } from 'react';
import { toast } from 'sonner';

export const AccessControl = () => {
  const isPasswordSet = useSettingsStore((state) => state.setPassword);
  const [isShowOverlay, setIsShowOverlay] = useState(isPasswordSet);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-xs animate-in fade-in duration-300">
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          autoFocus
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
      </div>
    );
  }

  return null;
};
