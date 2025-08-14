import { useState, useEffect } from 'react';

interface WorldClock {
  city: string;
  timezone: string;
  time: string;
  date: string;
}

export default function WorldClocks() {
  const [worldClocks, setWorldClocks] = useState<WorldClock[]>([]);

  useEffect(() => {
    const updateWorldClocks = () => {
      const now = new Date();
      const clocks: WorldClock[] = [
        {
          city: 'New York',
          timezone: 'EST',
          time: now.toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          date: now.toLocaleDateString('en-US', {
            timeZone: 'America/New_York',
            month: 'short',
            day: 'numeric',
          }),
        },
        {
          city: 'London',
          timezone: 'GMT',
          time: now.toLocaleTimeString('en-US', {
            timeZone: 'Europe/London',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          date: now.toLocaleDateString('en-US', {
            timeZone: 'Europe/London',
            month: 'short',
            day: 'numeric',
          }),
        },
        {
          city: 'Tokyo',
          timezone: 'JST',
          time: now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Tokyo',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          date: now.toLocaleDateString('en-US', {
            timeZone: 'Asia/Tokyo',
            month: 'short',
            day: 'numeric',
          }),
        },
      ];
      setWorldClocks(clocks);
    };

    updateWorldClocks();
    const interval = setInterval(updateWorldClocks, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[hsl(210,11%,18%)] rounded-xl shadow-lg border border-[hsl(210,11%,25%)] p-6">
      <h3 className="text-lg font-semibold text-white mb-4">World Clocks</h3>
      
      <div className="space-y-3">
        {worldClocks.map((clock, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-[hsl(210,11%,25%)] last:border-b-0"
          >
            <div>
              <div className="font-medium text-white">{clock.city}</div>
              <div className="text-sm text-gray-400">{clock.timezone}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-lg font-semibold text-white">{clock.time}</div>
              <div className="text-sm text-gray-400">{clock.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
