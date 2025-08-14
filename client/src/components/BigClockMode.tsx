import { useClock } from '@/hooks/useClock';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BigClockMode() {
  const { clockState, selectedTimezone, setSelectedTimezone } = useClock();

  const timezoneOptions = [
    { value: 'auto', label: `Auto-detected: ${clockState.timezone}` },
    { value: 'UTC', label: 'UTC' },
    { value: 'EST', label: 'Eastern Time (EST)' },
    { value: 'CST', label: 'Central Time (CST)' },
    { value: 'MST', label: 'Mountain Time (MST)' },
    { value: 'PST', label: 'Pacific Time (PST)' },
    { value: 'GMT', label: 'Greenwich Mean Time (GMT)' },
  ];

  return (
    <div className="bg-[hsl(210,11%,18%)] rounded-2xl shadow-xl border border-[hsl(210,11%,25%)] p-8 lg:p-12 text-center">
      {/* Timezone Selector */}
      <div className="mb-6">
        <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
          <SelectTrigger className="max-w-xs mx-auto bg-[hsl(210,11%,20%)] border-[hsl(210,11%,25%)] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timezoneOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current Date */}
      <div className="mb-4">
        <h2 className="text-2xl lg:text-3xl font-medium text-gray-300">
          {clockState.date}
        </h2>
      </div>

      {/* Big Time Display */}
      <div className="mb-8">
        <div className="clock-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight mb-2">
          {clockState.time}
        </div>
        {!clockState.is24Hour && (
          <div className="text-3xl lg:text-4xl font-semibold text-gray-300 clock-display">
            {clockState.amPm}
          </div>
        )}
      </div>

      {/* Time Zone Display */}
      <div className="text-lg lg:text-xl text-gray-400 font-medium">
        {selectedTimezone === 'auto' ? 'Auto-detected Timezone' : `${clockState.timezone} Time`}
      </div>
    </div>
  );
}
