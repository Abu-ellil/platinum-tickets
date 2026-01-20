"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronRight, CreditCard, Lock, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const { language, dir } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });

  const eventId = params.eventId as string;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    
    // Smooth scroll to top when loading starts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (isLoading) {
      const startTime = Date.now();
      const duration = 5000;

      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(progressTimer);
        }
      }, 50);

      timer = setTimeout(() => {
        // Save form data to session storage to preserve it
        sessionStorage.setItem("paymentData", JSON.stringify(formData));
        router.push(`/booking/${eventId}/otp`);
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [isLoading, eventId, router, formData]);

  const labels = {
    title: language === "ar" ? "معلومات الدفع" : "Payment Information",
    description: language === "ar" ? "أدخل تفاصيل بطاقتك لإتمام الحجز" : "Enter your card details to complete your booking",
    cardNumber: language === "ar" ? "رقم البطاقة" : "Card Number",
    expiryDate: language === "ar" ? "تاريخ الانتهاء" : "Expiry Date",
    cvv: language === "ar" ? "رمز التحقق (CVV)" : "CVV",
    cardHolder: language === "ar" ? "اسم صاحب البطاقة" : "Cardholder Name",
    payNow: language === "ar" ? "ادفع الآن" : "Pay Now",
    processing: language === "ar" ? "جاري معالجة دفعتك..." : "Processing your payment...",
    verifying: language === "ar" ? "جاري التحقق من التفاصيل..." : "Verifying details...",
    secure: language === "ar" ? "دفع آمن ومحمي" : "Secure & encrypted payment",
  };

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
        <Card className="shadow-lg border-t-4 border-t-primary overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-white/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
                <svg className="absolute inset-0 w-24 h-24 -rotate-90" aria-hidden="true">
                  <circle
                    cx="48"
                    cy="48"
                    r="46"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-primary"
                    strokeDasharray={289}
                    strokeDashoffset={289 - (289 * progress) / 100}
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {progress < 50 ? labels.processing : labels.verifying}
              </h2>
              <p className="text-gray-500 mb-8 max-w-xs">
                {language === "ar" 
                  ? "يرجى الانتظار قليلاً، نقوم بمعالجة طلبك بأمان" 
                  : "Please wait a moment, we are securely processing your request"}
              </p>

              <div className="w-full max-w-xs bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-primary h-full transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <p className="text-xs font-medium text-gray-400" aria-live="polite">
                {Math.round(progress)}%
              </p>
            </div>
          )}

          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div className="flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto opacity-50" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-auto opacity-50" />
              </div>
            </div>
            <CardTitle>{labels.title}</CardTitle>
            <CardDescription>{labels.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardHolder">{labels.cardHolder}</Label>
                <Input
                  id="cardHolder"
                  placeholder="John Doe"
                  required
                  value={formData.cardHolder}
                  onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">{labels.cardNumber}</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    className="ps-10"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    disabled={isLoading}
                  />
                  <CreditCard className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">{labels.expiryDate}</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">{labels.cvv}</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    required
                    type="password"
                    maxLength={3}
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              form="payment-form" 
              className="w-full h-12 text-lg font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="me-2 h-5 w-5 animate-spin" />
                  {labels.processing}
                </>
              ) : (
                labels.payNow
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Lock className="w-3 h-3" />
              <span>{labels.secure}</span>
            </div>
          </CardFooter>
        </Card>

        {/* Security Badges */}
        <div className="mt-8 grid grid-cols-3 gap-4 opacity-50 grayscale">
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-6" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 flex items-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <span className="text-[10px] font-bold ms-1">PCI DSS</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
