import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PerformanceTimeline({ timeline }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formattedData = timeline?.map(item => ({
    ...item,
    month: formatDate(item.date),
  })) || [];

  if (!timeline || timeline.length === 0) {
    return (
      <div className="w-full p-8">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#3B1E54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Performance Data</h3>
          <p className="text-gray-500 text-sm">Performance metrics will appear here once data becomes available.</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-4 min-w-32">
          <p className="text-sm font-medium text-gray-800 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3B1E54] to-purple-700"></div>
            <span className="text-sm text-gray-600">Score:</span>
            <span className="text-lg font-bold text-[#3B1E54]">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const maxScore = Math.max(...formattedData.map(item => item.score));
  const minScore = Math.min(...formattedData.map(item => item.score));
  const scoreRange = maxScore - minScore;
  const yAxisDomain = [
    Math.max(0, minScore - scoreRange * 0.1),
    maxScore + scoreRange * 0.1
  ];

  return (
    <div className="w-full p-6">
      <div className="bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 rounded-2xl shadow-xl border border-purple-100/50 backdrop-blur-sm overflow-hidden">
        {/* Header Section */}
        <div className="px-8 py-6 bg-gradient-to-r from-purple-900/5 to-purple-800/5 border-b border-purple-100/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Performance Timeline</h2>
              <p className="text-sm text-gray-600">Track your progress over time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Current Score</p>
                <p className="text-2xl font-bold bg-[#3B1E54] bg-clip-text text-transparent">
                  {formattedData[formattedData.length - 1]?.score || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#3B1E54] flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="p-8">
          <div className="w-full h-80 relative">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" className="text-purple-100">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B1E54" />
                    <stop offset="50%" stopColor="#9B7EBD" />
                    <stop offset="100%" stopColor="#3B1E54" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9B7EBD" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#9B7EBD" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="2 4" 
                  stroke="#9B7EBD" 
                  strokeOpacity={0.2}
                  vertical={false}
                />
                
                <XAxis 
                  dataKey="month" 
                  stroke="#3B1E54" 
                  fontSize={12}
                  fontWeight={500}
                  tick={{ fill: '#3B1E54' }}
                  axisLine={{ stroke: '#9B7EBD', strokeWidth: 2 }}
                  tickLine={{ stroke: '#9B7EBD' }}
                />
                
                <YAxis 
                  stroke="#3B1E54" 
                  fontSize={12}
                  fontWeight={500}
                  tick={{ fill: '#3B1E54' }}
                  axisLine={{ stroke: '#9B7EBD', strokeWidth: 2 }}
                  tickLine={{ stroke: '#9B7EBD' }}
                  domain={yAxisDomain}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                {/* Area fill under the line */}
                <defs>
                  <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9B7EBD" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#9B7EBD" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#lineGradient)"
                  strokeWidth={4}
                  fill="url(#fillGradient)"
                  dot={{ 
                    fill: '#FFFFFF', 
                    stroke: '#3B1E54', 
                    strokeWidth: 3, 
                    r: 6,
                    filter: 'drop-shadow(0px 2px 4px rgba(59, 30, 84, 0.2))'
                  }}
                  activeDot={{ 
                    r: 10, 
                    fill: '#3B1E54',
                    stroke: '#FFFFFF',
                    strokeWidth: 4,
                    filter: 'drop-shadow(0px 4px 8px rgba(59, 30, 84, 0.3))'
                  }}
                  style={{
                    filter: 'drop-shadow(0px 2px 4px rgba(155, 126, 189, 0.2))'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50/50 to-purple-50/30 border-t border-purple-100/50">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Data Points</p>
              <p className="text-lg font-bold text-gray-800">{formattedData.length}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Peak Score</p>
              <p className="text-lg font-bold text-[#3B1E54] ">{maxScore}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Trend</p>
              <div className="flex items-center justify-center gap-1">
                {formattedData.length >= 2 && formattedData[formattedData.length - 1].score > formattedData[formattedData.length - 2].score ? (
                  <>
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-green-600">Rising</span>
                  </>
                ) : formattedData.length >= 2 && formattedData[formattedData.length - 1].score < formattedData[formattedData.length - 2].score ? (
                  <>
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-red-600">Falling</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Stable</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}