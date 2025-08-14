import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

interface TimerState {
  duration: number; // in seconds
  timeLeft: number;
  isRunning: boolean;
  isCompleted: boolean;
}

interface TimerHistory {
  duration: number;
  label: string;
}

export default function TimerMode() {
  const [timerState, setTimerState] = useState<TimerState>({
    duration: 300, // 5 minutes default
    timeLeft: 300,
    isRunning: false,
    isCompleted: false
  });

  const [customMinutes, setCustomMinutes] = useState('5');
  const [customSeconds, setCustomSeconds] = useState('00');
  const [timerHistory, setTimerHistory] = useState<TimerHistory[]>([
    { duration: 300, label: '5 min' },
    { duration: 600, label: '10 min' },
    { duration: 1800, label: '30 min' }
  ]);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timerState.isRunning && timerState.timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            playCompletionSound();
            return {
              ...prev,
              timeLeft: 0,
              isRunning: false,
              isCompleted: true
            };
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.timeLeft]);

  const playCompletionSound = () => {
    // Create completion sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Play 3 beeps
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 880; // A5 note
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }, i * 600);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setPresetTimer = (minutes: number) => {
    const seconds = minutes * 60;
    setTimerState({
      duration: seconds,
      timeLeft: seconds,
      isRunning: false,
      isCompleted: false
    });
    
    // Add to history if not already there
    const label = `${minutes} min`;
    if (!timerHistory.some(item => item.duration === seconds)) {
      setTimerHistory(prev => [{ duration: seconds, label }, ...prev.slice(0, 4)]);
    }
  };

  const setCustomTimer = () => {
    const minutes = parseInt(customMinutes) || 0;
    const seconds = parseInt(customSeconds) || 0;
    const totalSeconds = minutes * 60 + seconds;
    
    if (totalSeconds > 0 && totalSeconds <= 5999) { // Max 99:59
      setTimerState({
        duration: totalSeconds,
        timeLeft: totalSeconds,
        isRunning: false,
        isCompleted: false
      });
      
      // Add to history
      const label = minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;
      if (!timerHistory.some(item => item.duration === totalSeconds)) {
        setTimerHistory(prev => [{ duration: totalSeconds, label }, ...prev.slice(0, 4)]);
      }
    }
  };

  const toggleTimer = () => {
    if (timerState.isCompleted) {
      // Reset completed timer
      setTimerState(prev => ({
        ...prev,
        timeLeft: prev.duration,
        isRunning: true,
        isCompleted: false
      }));
    } else {
      setTimerState(prev => ({
        ...prev,
        isRunning: !prev.isRunning
      }));
    }
  };

  const resetTimer = () => {
    setTimerState(prev => ({
      ...prev,
      timeLeft: prev.duration,
      isRunning: false,
      isCompleted: false
    }));
  };

  const getProgressPercentage = () => {
    return ((timerState.duration - timerState.timeLeft) / timerState.duration) * 100;
  };

  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="flex justify-center items-start gap-8">
        {/* Main Timer Section */}
        <div className="flex-1">
          {/* Timer Display */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">TIMER</h2>
            <div className="clock-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-3">
              {formatTime(timerState.timeLeft)}
            </div>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-4">
              <Progress 
                value={getProgressPercentage()} 
                className="h-2 bg-gray-700"
              />
              <div className="text-xs text-gray-400 mt-1">
                {Math.round(getProgressPercentage())}% Complete
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <Button
              onClick={toggleTimer}
              className={`btn-hover font-bold py-3 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl min-w-28 ${
                timerState.isRunning
                  ? 'bg-[hsl(0,84.2%,60.2%)] hover:bg-red-600 text-white'
                  : 'bg-[hsl(122,39%,49%)] hover:bg-green-600 text-white'
              }`}
            >
              {timerState.isCompleted ? 'RESTART' : timerState.isRunning ? 'PAUSE' : 'START'}
            </Button>
            
            <Button
              onClick={resetTimer}
              className="btn-hover bg-[hsl(14,86%,58%)] hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl min-w-28"
            >
              RESET
            </Button>
          </div>

          {/* Custom Timer Input - Below buttons with 55px gap */}
          <div style={{ marginTop: '55px' }}>
            <div className="bg-gray-800/50 rounded-lg mb-6">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div>
                  <Label htmlFor="minutes" className="text-xs text-gray-300">Min</Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="99"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                    className="w-16 h-8 text-center bg-gray-700 border-gray-600"
                  />
                </div>
                <span className="text-white text-lg">:</span>
                <div>
                  <Label htmlFor="seconds" className="text-xs text-gray-300">Sec</Label>
                  <Input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={customSeconds}
                    onChange={(e) => setCustomSeconds(e.target.value)}
                    className="w-16 h-8 text-center bg-gray-700 border-gray-600"
                  />
                </div>
              </div>
              <Button
                onClick={setCustomTimer}
                className="bg-blue-600 hover:bg-blue-700 text-sm py-2 px-4"
              >
                Set Timer
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Presets - Right side */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-3" style={{ width: '93px', height: '250px' }}>
          {[1, 5, 10, 30, 60].map((minutes) => (
            <Button
              key={minutes}
              onClick={() => setPresetTimer(minutes)}
              variant="outline"
              className="text-xs py-2 px-3 text-red-500 font-black border-gray-600 hover:bg-gray-800 bg-transparent"
            >
              {minutes}min
            </Button>
          ))}
        </div>
      </div>



      {/* Completion Alert */}
      {timerState.isCompleted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-green-900/90 border border-green-500 rounded-lg p-6 text-center">
            <div className="text-green-400 font-bold text-xl mb-2">Timer Complete!</div>
            <div className="text-white mb-4">Your {formatTime(timerState.duration)} timer has finished.</div>
            <Button
              onClick={() => setTimerState(prev => ({ ...prev, isCompleted: false }))}
              className="bg-green-600 hover:bg-green-700"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}