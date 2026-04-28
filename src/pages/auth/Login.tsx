import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#1A1C1E] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[480px] bg-[#24272B]/50 backdrop-blur-xl border border-gray-800/50 rounded-lg p-8 md:p-12 shadow-2xl space-y-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1A1C1E] border-none h-14 rounded-xl text-white placeholder:text-gray-600 px-6 focus:ring-1 focus:ring-blue-500 shadow-inner"
              placeholder="Email"
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1A1C1E] border-none h-14 rounded-xl text-white placeholder:text-gray-600 px-6 pr-12 focus:ring-1 focus:ring-blue-500 shadow-inner w-full"
                placeholder="Password"
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
          </div>

          <Button className="w-full bg-white hover:bg-gray-100 text-black h-14 rounded-lg font-bold text-base transition-all duration-300 shadow-lg cursor-pointer">
            Login
          </Button>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-gray-700" />
              <label htmlFor="remember" className="text-xs font-medium text-gray-500 cursor-pointer">Remember</label>
            </div>
            <Link to="/forgot-password" className="text-xs font-bold text-white hover:text-blue-500 transition-colors">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
