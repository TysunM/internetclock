export default function Header() {
  return (
    <header className="bg-[hsl(210,11%,18%)] shadow-sm border-b border-[hsl(210,11%,25%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[hsl(120,100%,50%)] rounded-lg flex items-center justify-center shadow-lg shadow-[hsl(120,100%,50%)]/50">
              <span className="text-black font-bold text-lg">⏰</span>
            </div>
            <h1 className="text-xl font-bold text-white">Internet Clock</h1>
          </div>
          
          {/* Strategic Ad Zone: Header Banner */}
          <div className="hidden md:block bg-[hsl(210,11%,20%)] border border-[hsl(210,11%,25%)] rounded-lg px-4 py-2 text-sm text-gray-400 flex items-center justify-center">
            {/* AD PLACEMENT: 728x90 Leaderboard */}
            <span className="text-center">Advertisement Space 728x90</span>
          </div>
        </div>
      </div>
    </header>
  );
}
