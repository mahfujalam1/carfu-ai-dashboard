import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1C1E] flex items-center justify-center p-6 font-sans relative">
      <div className="w-full max-w-[480px] bg-[#24272B]/50 backdrop-blur-xl border border-gray-800/50 rounded-lg p-8 md:p-12 shadow-2xl space-y-10 relative">
        <button 
          onClick={() => navigate('/verify-otp')}
          className="absolute left-4 top-4 text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">Create New Password</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1A1C1E] border-none h-14 rounded-xl text-white placeholder:text-gray-600 px-6 pr-12 focus:ring-1 focus:ring-blue-500 shadow-inner w-full"
                placeholder="Enter New Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="relative">
              <Input 
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#1A1C1E] border-none h-14 rounded-xl text-white placeholder:text-gray-600 px-6 pr-12 focus:ring-1 focus:ring-blue-500 shadow-inner w-full"
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button className="w-full bg-white hover:bg-gray-100 text-black h-14 rounded-lg font-bold text-base transition-all duration-300 shadow-lg cursor-pointer">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
