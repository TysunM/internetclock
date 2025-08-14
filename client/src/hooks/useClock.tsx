import { useState, useEffect } from 'react';

export interface ClockState {
  time: string;
  date: string;
  amPm: string;
  timezone: string;
  is24Hour: boolean;
}

export function useClock() {
  const [clockState, setClockState] = useState<ClockState>({
    time: '00:00:00',
    date: '',
    amPm: 'AM',
    timezone: 'EST',
    is24Hour: false,
  });

  const [selectedTimezone, setSelectedTimezone] = useState<string>('auto');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      // Auto-detect timezone if 'auto' is selected
      let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Handle manual timezone selection
      const timezoneMap: Record<string, string> = {
        'UTC': 'UTC',
        'EST': 'America/New_York',
        'CST': 'America/Chicago',
        'MST': 'America/Denver',
        'PST': 'America/Los_Angeles',
        'GMT': 'Europe/London',
      };

      if (selectedTimezone !== 'auto' && timezoneMap[selectedTimezone]) {
        timeZone = timezoneMap[selectedTimezone];
      }

      // Format time
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone,
        hour12: !clockState.is24Hour,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };

      const timeString = now.toLocaleTimeString('en-US', timeOptions);
      let formattedTime = timeString;
      let amPm = '';

      if (!clockState.is24Hour) {
        const parts = timeString.split(' ');
        formattedTime = parts[0];
        amPm = parts[1] || '';
      }

      // Format date
      const dateString = now.toLocaleDateString('en-US', {
        timeZone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Get timezone abbreviation
      const timezoneAbbr = selectedTimezone === 'auto' 
        ? Intl.DateTimeFormat('en', { timeZone, timeZoneName: 'short' })
            .formatToParts(now)
            .find(part => part.type === 'timeZoneName')?.value || 'Local'
        : selectedTimezone;

      setClockState({
        time: formattedTime,
        date: dateString,
        amPm,
        timezone: timezoneAbbr,
        is24Hour: clockState.is24Hour,
      });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [selectedTimezone, clockState.is24Hour]);

  const toggleFormat = () => {
    setClockState(prev => ({ ...prev, is24Hour: !prev.is24Hour }));
  };

  return {
    clockState,
    selectedTimezone,
    setSelectedTimezone,
    toggleFormat,
  };
}
