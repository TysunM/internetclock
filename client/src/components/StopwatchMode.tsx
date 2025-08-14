import { useStopwatch } from '@/hooks/useStopwatch';
import { Button } from '@/components/ui/button';

export default function StopwatchMode() {
  const { stopwatchState, toggle, reset, recordSplit } = useStopwatch();

  return (
    <div className="bg-[hsl(210,11%,18%)] rounded-2xl shadow-xl border border-[hsl(210,11%,25%)] p-8 lg:p-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-8">Stopwatch</h2>

      {/* Stopwatch Display */}
      <div className="mb-8">
        <div className="stopwatch-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
          {stopwatchState.time}
        </div>
        <div className="text-2xl lg:text-3xl text-gray-300 mt-2 font-medium">
          HRS : MIN : SEC
        </div>
      </div>

      {/* Stopwatch Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Button
          onClick={toggle}
          className={`btn-hover font-bold py-4 px-8 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl min-w-32 ${
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
          className={`btn-hover font-bold py-4 px-8 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl min-w-32 ${
            stopwatchState.isRunning
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          SPLIT
        </Button>
        <Button
          onClick={reset}
          className="btn-hover bg-[hsl(14,86%,58%)] hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl min-w-32"
        >
          RESET
        </Button>
      </div>

      {/* Split Times */}
      <div className="max-h-40 overflow-y-auto">
        {stopwatchState.splits.map((split, index) => (
          <div key={index} className="bg-[hsl(210,11%,20%)] rounded-lg p-3 mb-2 flex justify-between items-center">
            <span className="font-semibold text-gray-300">Split {index + 1}</span>
            <span className="font-mono text-lg text-white">{split}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
