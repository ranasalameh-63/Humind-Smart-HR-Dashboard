import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";

export default function PeerComparison({ peerComparison, currentEmployeeName }) {
  if (!peerComparison || peerComparison.length === 0) {
    return (
      <div className="flex items-center justify-center h-72 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No peer comparison data available</p>
          <p className="text-sm text-gray-400">Data will appear here once available</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isCurrentEmployee = label === currentEmployeeName;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: isCurrentEmployee ? '#3B1E54' : '#9B7EBD' }}
            />
            <p className="font-semibold text-gray-800">{label}</p>
            {isCurrentEmployee && (
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full font-medium">
                You
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Score: <span className="font-bold text-gray-900">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const maxScore = Math.max(...peerComparison.map(item => item.score));
  const averageScore = peerComparison.reduce((sum, item) => sum + item.score, 0) / peerComparison.length;

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Peer Performance Comparison</h3>
            <p className="text-gray-600">Compare your performance against team members</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Team Average</div>
            <div className="text-2xl font-bold text-purple-600">{averageScore.toFixed(1)}</div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-purple-600 to-purple-700"></div>
            <span className="text-sm font-medium text-gray-700">Your Score</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-purple-300 to-purple-400"></div>
            <span className="text-sm font-medium text-gray-700">Peer Scores</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={peerComparison} 
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barCategoryGap="15%"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
                strokeOpacity={0.6}
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey="employee" 
                stroke="#374151"
                fontSize={12}
                fontWeight={500}
                axisLine={{ stroke: '#D1D5DB', strokeWidth: 1 }}
                tickLine={{ stroke: '#D1D5DB' }}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                stroke="#374151"
                fontSize={12}
                fontWeight={500}
                axisLine={{ stroke: '#D1D5DB', strokeWidth: 1 }}
                tickLine={{ stroke: '#D1D5DB' }}
                domain={[0, maxScore * 1.1]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="score" 
                name="Score"
                radius={[4, 4, 0, 0]}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth={1}
              >
                {peerComparison.map((entry, index) => {
                  const isCurrentEmployee = entry.employee === currentEmployeeName;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={isCurrentEmployee ? 
                        "url(#currentEmployeeGradient)" : 
                        "url(#peerGradient)"
                      }
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  );
                })}
              </Bar>
              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="currentEmployeeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B1E54" />
                  <stop offset="100%" stopColor="#2D1B69" />
                </linearGradient>
                <linearGradient id="peerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9B7EBD" />
                  <stop offset="100%" stopColor="#8B6BB1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-purple-600">
            {peerComparison.find(p => p.employee === currentEmployeeName)?.score || 'N/A'}
          </div>
          <div className="text-sm text-gray-500 font-medium">Your Score</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-indigo-600">{maxScore}</div>
          <div className="text-sm text-gray-500 font-medium">Highest Score</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-emerald-600">{peerComparison.length}</div>
          <div className="text-sm text-gray-500 font-medium">Team Members</div>
        </div>
      </div>
    </div>
  );
}