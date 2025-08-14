interface ModeSelectorProps {
  currentMode: 'bigClock' | 'stopwatch';
  onModeChange: (mode: 'bigClock' | 'stopwatch') => void;
}

export default function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex bg-[hsl(210,11%,18%)] rounded-xl p-1 shadow-lg border border-[hsl(210,11%,25%)]">
        <button
          onClick={() => onModeChange('bigClock')}
          className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 mode-transition ${
            currentMode === 'bigClock'
              ? 'bg-[hsl(120,100%,50%)] text-black shadow-sm shadow-[hsl(120,100%,50%)]/50'
              : 'text-gray-300 hover:text-white hover:bg-[hsl(210,11%,20%)]'
          }`}
        >
          🕐 Big Clock
        </button>
        <button
          onClick={() => onModeChange('stopwatch')}
          className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 mode-transition ${
            currentMode === 'stopwatch'
              ? 'bg-[hsl(120,100%,50%)] text-black shadow-sm shadow-[hsl(120,100%,50%)]/50'
              : 'text-gray-300 hover:text-white hover:bg-[hsl(210,11%,20%)]'
          }`}
        >
          ⏱️ Stopwatch
        </button>
      </div>
    </div>
  );
}
