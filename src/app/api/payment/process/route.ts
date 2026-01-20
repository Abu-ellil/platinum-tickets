import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { PaymentLog } from '@/models';
import { validateCard } from '@/lib/card-validation';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { 
      cardNumber, 
      cvv, 
      expiryMonth, 
      expiryYear, 
      amount, 
      currency, 
      eventTitle 
    } = body;

    // Get client info for security logging
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Mask card number for PCI DSS compliance
    const maskedCard = cardNumber.replace(/\s/g, '').replace(/.(?=.{4})/g, '*');

    // 1. Perform card validation
    const validation = validateCard(cardNumber, cvv, expiryMonth, expiryYear);

    if (!validation.isValid) {
      // Log failed attempt
      await PaymentLog.create({
        cardNumberMasked: maskedCard,
        cardType: validation.cardType,
        status: 'failed',
        error: validation.error,
        amount,
        currency,
        eventTitle,
        ipAddress,
        userAgent
      });

      return NextResponse.json({ 
        success: false, 
        message: validation.error || 'عملية دفع غير صالحة' 
      }, { status: 400 });
    }

    // 2. Here you would normally integrate with a real payment gateway like Stripe, Moyasar, etc.
    // For this task, we assume the validation is the core requirement.
    
    // Log successful attempt
    await PaymentLog.create({
      cardNumberMasked: maskedCard,
      cardType: validation.cardType,
      status: 'success',
      amount,
      currency,
      eventTitle,
      ipAddress,
      userAgent
    });

    return NextResponse.json({ 
      success: true, 
      message: 'تمت عملية الدفع بنجاح' 
    });

  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'حدث خطأ أثناء معالجة الدفع' 
    }, { status: 500 });
  }
}
