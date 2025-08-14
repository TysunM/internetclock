import { useStopwatch } from '@/hooks/useStopwatch';
import { Button } from '@/components/ui/button';

export default function SimpleStopwatch() {
  const { stopwatchState, toggle, reset, recordSplit } = useStopwatch();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-6">Stopwatch</h2>

      {/* Stopwatch Display */}
      <div className="mb-8">
        <div className="stopwatch-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight">
          {stopwatchState.time}
        </div>
        <div className="text-xl lg:text-2xl text-gray-300 mt-2 font-medium">
          HRS : MIN : SEC : MS
        </div>
      </div>

      {/* Stopwatch Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Button
          onClick={toggle}
          className={`btn-hover font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl min-w-32 ${
            stopwatchState.isRunning
              ? 'bg-[hsl(0,84.2%,60.2%)] hover:bg-red-600 text-white'
              : 'bg-[hsl(122,39%,49%)] hover:bg-green-600 text-white'
          }`}
        >
          {stopwatchState.isRunning ? 'STOP' : 'START'}
        </Button>
        <Button
          onClick={recordSplit}
          disabled={!stopwatchState.isRunning}
          className={`btn-hover font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl min-w-32 ${
            stopwatchState.isRunning
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          SPLIT
        </Button>
        <Button
          onClick={reset}
          className="btn-hover bg-[hsl(14,86%,58%)] hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl min-w-32"
        >
          RESET
        </Button>
      </div>

      {/* Split Times */}
      {stopwatchState.splits.length > 0 && (
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Split Times</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {stopwatchState.splits.map((split, index) => (
              <div key={index} className="bg-[hsl(210,11%,20%)] rounded-lg p-3 flex justify-between items-center">
                <span className="font-semibold text-gray-300">Split {index + 1}</span>
                <span className="font-mono text-lg text-white">{split}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}