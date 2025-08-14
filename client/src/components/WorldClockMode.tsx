import { useState, useEffect } from 'react';

interface WorldClock {
  city: string;
  timezone: string;
  time: string;
  amPm: string;
  date: string;
  country: string;
}

export default function WorldClockMode() {
  const [worldClocks, setWorldClocks] = useState<WorldClock[]>([]);
  const [localTime, setLocalTime] = useState({
    time: '',
    amPm: '',
    date: '',
    timezone: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      
      // Local time
      const localTimeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const [localTimeOnly, localAmPm] = localTimeString.split(' ');
      const localDateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      setLocalTime({
        time: localTimeOnly,
        amPm: localAmPm,
        date: localDateString,
        timezone: localTimezone
      });

      // World clocks
      const cities = [
        { city: 'NEW YORK', country: 'USA', timezone: 'America/New_York' },
        { city: 'PARIS', country: 'FRANCE', timezone: 'Europe/Paris' },
        { city: 'SYDNEY', country: 'AUSTRALIA', timezone: 'Australia/Sydney' }
      ];

      const clocks = cities.map(cityInfo => {
        const timeString = now.toLocaleTimeString('en-US', {
          timeZone: cityInfo.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        const [time, amPm] = timeString.split(' ');
        
        const date = now.toLocaleDateString('en-US', {
          timeZone: cityInfo.timezone,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });

        return {
          city: cityInfo.city,
          country: cityInfo.country,
          timezone: cityInfo.timezone,
          time,
          amPm,
          date
        };
      });

      setWorldClocks(clocks);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center max-w-6xl mx-auto">
      {/* Local Time Display */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-300 mb-3">Your Local Time</h2>
        <div className="flex items-center justify-center mb-4">
          <div className="world-clock-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight">
            {localTime.time}
          </div>
          <div className="ml-4 text-2xl lg:text-3xl font-semibold text-white world-clock-display self-start mt-2">
            {localTime.amPm}
          </div>
        </div>
        <div className="text-lg lg:text-xl text-gray-300 mb-1">{localTime.date}</div>
        <div className="text-sm text-gray-400">{localTime.timezone}</div>
      </div>

      {/* World Clocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {worldClocks.map((clock, index) => (
          <div key={index} className="text-center">
            <h3 className="text-lg font-bold text-white mb-1">{clock.city}</h3>
            <div className="text-xs text-gray-400 mb-3">{clock.country}</div>
            
            <div className="flex items-center justify-center mb-3">
              <div className="world-clock-display text-2xl sm:text-3xl md:text-4xl font-black leading-none tracking-tight">
                {clock.time}
              </div>
              <div className="ml-2 text-lg font-semibold text-white world-clock-display self-start mt-1">
                {clock.amPm}
              </div>
            </div>
            
            <div className="text-gray-300 text-xs">{clock.date}</div>
            <div className="text-gray-500 text-xs mt-1">
              {clock.timezone.split('/')[1]?.replace('_', ' ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}