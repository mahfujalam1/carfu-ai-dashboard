import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const RegisterStatus = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-[#1A1C1E] border-none text-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-300">Today's Register Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div 
          onClick={() => navigate('/users')}
          className="flex justify-between items-center bg-[#121417] p-4 rounded-2xl border border-gray-800/50 cursor-pointer hover:bg-white/5 transition-colors"
        >
          <span className="text-gray-400 text-sm font-medium">New Registered</span>
          <span className="text-gray-400 font-bold">126</span>
        </div>
        <div 
          onClick={() => navigate('/incomplete-users')}
          className="flex justify-between items-center bg-[#121417] p-4 rounded-2xl border border-gray-800/50 cursor-pointer hover:bg-white/5 transition-colors"
        >
          <span className="text-gray-400 text-sm font-medium">Incomplete</span>
          <span className="text-gray-400 font-bold">47</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterStatus;
