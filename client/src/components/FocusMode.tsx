import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  currentSession: number;
  totalSessions: number;
  isBreak: boolean;
  isLongBreak: boolean;
}

const POMODORO_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds

export default function FocusMode() {
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>({
    timeLeft: POMODORO_TIME,
    isRunning: false,
    currentSession: 1,
    totalSessions: 4,
    isBreak: false,
    isLongBreak: false
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (pomodoroState.isRunning && pomodoroState.timeLeft > 0) {
      interval = setInterval(() => {
        setPomodoroState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (pomodoroState.timeLeft === 0) {
      // Timer completed
      playCompletionSound();
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [pomodoroState.isRunning, pomodoroState.timeLeft]);

  const playCompletionSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  const handleTimerComplete = () => {
    setPomodoroState(prev => {
      if (prev.isBreak) {
        // Break completed, start next session
        return {
          ...prev,
          timeLeft: POMODORO_TIME,
          isRunning: false,
          isBreak: false,
          isLongBreak: false,
          currentSession: prev.isLongBreak ? 1 : prev.currentSession + 1
        };
      } else {
        // Pomodoro completed, start break
        const isLongBreakTime = prev.currentSession % 4 === 0;
        return {
          ...prev,
          timeLeft: isLongBreakTime ? LONG_BREAK_TIME : SHORT_BREAK_TIME,
          isRunning: false,
          isBreak: true,
          isLongBreak: isLongBreakTime
        };
      }
    });
  };

  const toggleTimer = () => {
    setPomodoroState(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const resetTimer = () => {
    setPomodoroState({
      timeLeft: POMODORO_TIME,
      isRunning: false,
      currentSession: 1,
      totalSessions: 4,
      isBreak: false,
      isLongBreak: false
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalTime = pomodoroState.isBreak 
      ? (pomodoroState.isLongBreak ? LONG_BREAK_TIME : SHORT_BREAK_TIME)
      : POMODORO_TIME;
    return ((totalTime - pomodoroState.timeLeft) / totalTime) * 100;
  };

  const getCurrentMode = () => {
    if (pomodoroState.isBreak) {
      return pomodoroState.isLongBreak ? 'Long Break' : 'Short Break';
    }
    return 'Focus Session';
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Mode and Session Display */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">FOCUS (POMODORO)</h2>
        <div className="text-base text-gray-300 mb-2">
          {getCurrentMode()} • Session {pomodoroState.currentSession} of {pomodoroState.totalSessions}
        </div>
      </div>

      {/* Timer Display */}
      <div className="mb-6">
        <div className="clock-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-3">
          {formatTime(pomodoroState.timeLeft)}
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
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
        <Button
          onClick={toggleTimer}
          className={`btn-hover font-bold py-3 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl min-w-28 ${
            pomodoroState.isRunning
              ? 'bg-[hsl(0,84.2%,60.2%)] hover:bg-red-600 text-white'
              : 'bg-[hsl(122,39%,49%)] hover:bg-green-600 text-white'
          }`}
        >
          {pomodoroState.isRunning ? 'PAUSE' : 'START'}
        </Button>
        
        <Button
          onClick={resetTimer}
          className="btn-hover bg-[hsl(14,86%,58%)] hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl min-w-28"
        >
          RESET
        </Button>
      </div>

      {/* Status Messages */}
      {pomodoroState.timeLeft === 0 && (
        <div className="bg-green-900/50 border border-green-500 rounded-lg p-3 mb-4">
          <div className="text-green-400 font-semibold text-sm">
            {pomodoroState.isBreak ? 'Break time is over!' : 'Great work! Time for a break.'}
          </div>
        </div>
      )}

      {/* Productivity Stats */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-base font-semibold text-white mb-3">Today's Progress</h3>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-xl font-bold text-green-400">
              {pomodoroState.currentSession - 1}
            </div>
            <div className="text-xs text-gray-400">Completed Sessions</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-400">
              {(pomodoroState.currentSession - 1) * 25}
            </div>
            <div className="text-xs text-gray-400">Focus Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
}