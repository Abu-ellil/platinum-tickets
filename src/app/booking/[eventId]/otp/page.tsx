"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, ShieldCheck, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

export default function OTPPage() {
  const router = useRouter();
  const params = useParams();
  const { language, dir } = useLanguage();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(59);
  const [paymentData, setPaymentData] = useState<any>(null);

  const eventId = params.eventId as string;

  useEffect(() => {
    // Retrieve preserved payment data
    const data = sessionStorage.getItem("paymentData");
    if (data) {
      setPaymentData(JSON.parse(data));
    } else {
      // If no payment data, redirect back to payment
      router.replace(`/booking/${eventId}/payment`);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      alert(language === "ar" ? "تم تأكيد الحجز بنجاح!" : "Booking confirmed successfully!");
      router.push(`/`);
    }, 2000);
  };

  const labels = {
    title: language === "ar" ? "التحقق من الرمز" : "OTP Verification",
    description: language === "ar" ? "أدخل الرمز المكون من 6 أرقام المرسل إلى هاتفك" : "Enter the 6-digit code sent to your phone",
    verify: language === "ar" ? "تحقق" : "Verify",
    verifying: language === "ar" ? "جاري التحقق..." : "Verifying...",
    resend: language === "ar" ? "إعادة إرسال الرمز" : "Resend Code",
    timer: language === "ar" ? "إعادة الإرسال خلال" : "Resend in",
    seconds: language === "ar" ? "ثانية" : "s",
    secureTitle: language === "ar" ? "عملية آمنة" : "Secure Transaction",
    lastDigits: language === "ar" ? "للبطاقة التي تنتهي بـ" : "for card ending in",
  };

  const lastFourDigits = paymentData?.cardNumber?.slice(-4) || "****";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir={dir}>
      {/* Header */}
      <header className="h-14 bg-white border-b flex items-center px-4 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="me-2">
          <ChevronRight className={`w-6 h-6 ${dir === 'rtl' ? '' : 'rotate-180'}`} />
        </Button>
        <h1 className="font-bold text-lg">{labels.title}</h1>
      </header>

      <main className="flex-1 container max-w-lg mx-auto p-4 py-8">
        <Card className="shadow-lg border-t-4 border-t-primary overflow-hidden">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle>{labels.title}</CardTitle>
            <CardDescription>
              {labels.description}
              <br />
              <span className="font-medium text-gray-900">
                {labels.lastDigits} {lastFourDigits}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="otp-form" onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-between gap-2" dir="ltr">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 focus:border-primary"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    required
                    disabled={isVerifying}
                  />
                ))}
              </div>

              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-gray-500">
                    {labels.timer} <span className="font-bold text-primary">{timer}{labels.seconds}</span>
                  </p>
                ) : (
                  <Button variant="link" className="text-primary font-bold h-auto p-0 gap-2">
                    <RefreshCw className="w-4 h-4" />
                    {labels.resend}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button 
              type="submit" 
              form="otp-form" 
              className="w-full h-12 text-lg font-bold"
              disabled={isVerifying || otp.some(d => !d)}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="me-2 h-5 w-5 animate-spin" />
                  {labels.verifying}
                </>
              ) : (
                labels.verify
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          <span>{labels.secureTitle}</span>
        </div>
      </main>
    </div>
  );
}
