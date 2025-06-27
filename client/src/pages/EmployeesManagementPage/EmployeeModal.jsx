export default function EmployeeModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
<style jsx>{`
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`}</style>

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/100 via-purple-900/20 to-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl relative border border-white/20 transform animate-slideUp">
    {/* Decorative gradient border */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 p-[1px]">
      <div className="h-full w-full rounded-2xl bg-white/95 backdrop-blur-xl" />
    </div>
    
    {/* Content container */}
    <div className="relative z-10">
      <button 
        onClick={onClose}
        className="absolute -top-2 z-20 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-110 "
      >
        &times;
      </button>
      
      {/* Subtle glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-pink-400/10 rounded-3xl blur-xl" />
      
      <div className="relative">
        {children}
      </div>
    </div>
  </div>
</div>
  );
}
