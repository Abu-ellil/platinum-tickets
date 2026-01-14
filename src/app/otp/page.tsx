'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/language-context';

export default function OTPPage() {
  const { language, dir } = useLanguage();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    const otpCode = otp.join('');
    
    try {
      const response = await fetch('/api/payment/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpCode }),
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = '/success';
      } else {
        alert('Invalid OTP code');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const isAr = language === 'ar';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]" dir={dir}>
      <header className="sticky top-0 bg-white border-b h-14 flex items-center px-4 z-30">
        <button 
          onClick={() => window.history.back()} 
          className="p-2 -ml-2"
        >
          {isAr ? <ChevronRight className="w-6 h-6 text-gray-600" /> : <ChevronLeft className="w-6 h-6 text-gray-600" />}
        </button>
        <h1 className="flex-1 text-center font-bold text-lg mr-8">
          {isAr ? 'التحقق' : 'Verification'}
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">
              {isAr ? 'أدخل رمز التحقق' : 'Enter Verification Code'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isAr ? 'أدخل الرمز المكون من 6 أرقام المرسل إلى هاتفك' : 'Enter the 6-digit code sent to your phone'}
            </p>
          </div>

          <div className="flex justify-center gap-2" dir="ltr">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 focus:border-blue-500 focus-visible:ring-0"
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              {isAr ? 'ينتهي خلال' : 'Expires in'}
            </p>
            <div className="inline-flex items-center gap-2 text-pink-500 font-bold bg-pink-50 px-4 py-2 rounded-lg">
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <Button
            onClick={handleVerify}
            disabled={otp.join('').length !== 6 || isLoading}
            className={`w-full h-12 text-lg font-bold rounded-xl transition-all duration-200 ${
              otp.join('').length === 6 && !isLoading
                ? 'bg-[#1A162E] text-white hover:bg-[#2a244a] shadow-lg shadow-gray-200'
                : 'bg-[#F1F3F5] text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (isAr ? 'جاري التحقق...' : 'Verifying...') : (isAr ? 'تحقق' : 'Verify')}
          </Button>

          <div className="text-center">
            <button className="text-blue-600 text-sm font-medium hover:underline">
              {isAr ? 'إعادة إرسال الرمز' : 'Resend Code'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
