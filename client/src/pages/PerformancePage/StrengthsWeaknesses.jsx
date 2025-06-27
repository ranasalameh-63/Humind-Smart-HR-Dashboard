export default function StrengthsWeaknesses({ strengthsWeaknesses = {} }) {
  const { strengths = [], weaknesses = [] } = strengthsWeaknesses;
  const formatLabel = (label) =>
    label.charAt(0).toUpperCase() + label.slice(1);
  
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border-l-4 border-[#9B7EBD] hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#9B7EBD] rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg font-bold">✓</span>
            </div>
            <h4 className="text-xl font-bold text-[#3B1E54]">Strengths</h4>
          </div>
          
          {strengths.length > 0 ? (
            <div className="space-y-3">
              {strengths.map((s, i) => (
                <div 
                  key={i} 
                  className="flex items-start p-3 bg-white rounded-lg border border-gray-100 hover:border-[#9B7EBD] transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-[#9B7EBD] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#3B1E54] font-medium leading-relaxed">
                    {formatLabel(s)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-400 text-2xl">○</span>
              </div>
              <p className="text-gray-500 font-medium">No strengths identified</p>
            </div>
          )}
        </div>

        {/* Weaknesses Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border-l-4 border-[#000000] hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#000000] rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg font-bold">!</span>
            </div>
            <h4 className="text-xl font-bold text-[#3B1E54]">Areas for Improvement</h4>
          </div>
          
          {weaknesses.length > 0 ? (
            <div className="space-y-3">
              {weaknesses.map((w, i) => (
                <div 
                  key={i} 
                  className="flex items-start p-3 bg-white rounded-lg border border-gray-100 hover:border-[#000000] transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-[#000000] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#3B1E54] font-medium leading-relaxed">
                    {formatLabel(w)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-400 text-2xl">○</span>
              </div>
              <p className="text-gray-500 font-medium">No weaknesses found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
