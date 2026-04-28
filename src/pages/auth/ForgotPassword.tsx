import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen bg-[#1A1C1E] flex items-center justify-center p-6 font-sans relative">
      <div className="w-full max-w-[480px] bg-[#24272B]/50 backdrop-blur-xl border border-gray-800/50 rounded-lg p-8 md:p-12 shadow-2xl space-y-10 relative">
        <button 
          onClick={() => navigate('/login')}
          className="absolute left-4 top-4 text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">Forgot Password</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1A1C1E] border-none h-14 rounded-xl text-white placeholder:text-gray-600 px-6 focus:ring-1 focus:ring-blue-500 shadow-inner"
            placeholder="Email"
            required
          />

          <Button className="w-full bg-white hover:bg-gray-100 text-black h-14 rounded-lg font-bold text-base transition-all duration-300 shadow-lg cursor-pointer">
            Get OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
