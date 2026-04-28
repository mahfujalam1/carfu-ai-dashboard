import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const data = [
  { name: 'JAN', complete: 600, incomplete: 700 },
  { name: 'FEB', complete: 1000, incomplete: 500 },
  { name: 'MAR', complete: 700, incomplete: 900 },
  { name: 'APR', complete: 850, incomplete: 550 },
  { name: 'MAY', complete: 750, incomplete: 450 },
  { name: 'JUN', complete: 900, incomplete: 600 },
  { name: 'JUL', complete: 1100, incomplete: 700 },
  { name: 'AUG', complete: 800, incomplete: 500 },
  { name: 'SEP', complete: 1000, incomplete: 950 },
  { name: 'OCT', complete: 700, incomplete: 600 },
  { name: 'NOV', complete: 950, incomplete: 700 },
  { name: 'DEC', complete: 800, incomplete: 1000 },
];

const ActivityChart = () => {
  return (
    <div className="w-full h-[400px] bg-[#1A1C1E] rounded-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-white">Activity</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Complete Signup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Incomplete Signup</span>
          </div>
          <select className="bg-transparent text-gray-400 text-xs border border-gray-700 rounded px-2 py-1 focus:outline-none">
            <option>Year</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorComplete" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3135" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1A1C1E', border: '1px solid #374151', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area
            type="monotone"
            dataKey="complete"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorComplete)"
          />
          <Area
            type="monotone"
            dataKey="incomplete"
            stroke="#6B7280"
            strokeWidth={3}
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
