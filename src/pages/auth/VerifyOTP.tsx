import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every(digit => digit !== '')) {
      navigate('/reset-password');
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1C1E] flex items-center justify-center p-6 font-sans relative">
      <div className="w-full max-w-[480px] bg-[#24272B]/50 backdrop-blur-xl border border-gray-800/50 rounded-lg p-8 md:p-12 shadow-2xl space-y-10 relative">
        <button 
          onClick={() => navigate('/forgot-password')}
          className="absolute left-4 top-4 text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Forgot Password</h1>
          <p className="text-xs text-gray-500">Enter The Code We've Sent To Your Mail</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 md:w-14 md:h-14 bg-[#1A1C1E] border-none rounded-xl text-white text-center text-xl font-bold focus:ring-1 focus:ring-blue-500 shadow-inner"
                maxLength={1}
              />
            ))}
          </div>

          <div className="space-y-6">
            <Button className="w-full bg-white hover:bg-gray-100 text-black h-14 rounded-lg font-bold text-base transition-all duration-300 shadow-lg cursor-pointer">
              Verify
            </Button>
            
            <p className="text-center text-xs text-gray-500">
              Haven't Received The OTP? <button type="button" className="text-white font-bold hover:text-blue-500 transition-colors cursor-pointer">Resend OTP</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
