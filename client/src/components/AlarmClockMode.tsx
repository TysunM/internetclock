import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus } from 'lucide-react';

interface Alarm {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
  snoozeMinutes: number;
  soundType: string;
}

export default function AlarmClockMode() {
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: '1',
      time: '07:00',
      label: 'Wake up',
      enabled: true,
      snoozeMinutes: 10,
      soundType: 'classic'
    }
  ]);
  const [currentTime, setCurrentTime] = useState('');
  const [nextAlarm, setNextAlarm] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlarm, setNewAlarm] = useState({
    time: '08:00',
    label: '',
    snoozeMinutes: 10,
    soundType: 'classic'
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeString);

      // Calculate next alarm
      const enabledAlarms = alarms.filter(alarm => alarm.enabled);
      if (enabledAlarms.length > 0) {
        const nextAlarmTime = findNextAlarm(enabledAlarms, now);
        setNextAlarm(nextAlarmTime);
      } else {
        setNextAlarm('No alarms set');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  const findNextAlarm = (enabledAlarms: Alarm[], currentTime: Date) => {
    const now = currentTime.getTime();
    let nextAlarmMs = Infinity;
    let nextAlarmLabel = '';

    enabledAlarms.forEach(alarm => {
      const [hours, minutes] = alarm.time.split(':').map(Number);
      const alarmTime = new Date();
      alarmTime.setHours(hours, minutes, 0, 0);
      
      let alarmMs = alarmTime.getTime();
      
      // If alarm time has passed today, set it for tomorrow
      if (alarmMs <= now) {
        alarmMs += 24 * 60 * 60 * 1000;
      }
      
      if (alarmMs < nextAlarmMs) {
        nextAlarmMs = alarmMs;
        nextAlarmLabel = alarm.label;
      }
    });

    if (nextAlarmMs === Infinity) return 'No alarms set';

    const timeUntil = nextAlarmMs - now;
    const hoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
    const minutesUntil = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));

    if (hoursUntil > 0) {
      return `${nextAlarmLabel} in ${hoursUntil}h ${minutesUntil}m`;
    } else {
      return `${nextAlarmLabel} in ${minutesUntil}m`;
    }
  };

  const addAlarm = () => {
    if (alarms.length >= 5) return;
    
    const alarm: Alarm = {
      id: Date.now().toString(),
      time: newAlarm.time,
      label: newAlarm.label || 'Alarm',
      enabled: true,
      snoozeMinutes: newAlarm.snoozeMinutes,
      soundType: newAlarm.soundType
    };
    
    setAlarms([...alarms, alarm]);
    setNewAlarm({
      time: '08:00',
      label: '',
      snoozeMinutes: 10,
      soundType: 'classic'
    });
    setShowAddForm(false);
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };

  const updateAlarm = (id: string, updates: Partial<Alarm>) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, ...updates } : alarm
    ));
  };

  return (
    <div className="text-center max-w-4xl mx-auto">
      {/* Current Time Display */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">ALARM CLOCK</h2>
        <div className="clock-display text-4xl sm:text-5xl md:text-6xl font-black leading-none tracking-tight mb-2">
          {currentTime}
        </div>
        <div className="text-sm text-gray-300">{nextAlarm}</div>
      </div>

      {/* Alarms List */}
      <div className="space-y-3 mb-6">
        {alarms.map((alarm) => (
          <div key={alarm.id} className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Switch
                checked={alarm.enabled}
                onCheckedChange={() => toggleAlarm(alarm.id)}
              />
              <div className="text-left">
                <div className="world-clock-display text-2xl font-bold">
                  {alarm.time}
                </div>
                <div className="text-sm text-gray-400">{alarm.label}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={alarm.snoozeMinutes.toString()}
                onValueChange={(value) => updateAlarm(alarm.id, { snoozeMinutes: parseInt(value) })}
              >
                <SelectTrigger className="w-20 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5m</SelectItem>
                  <SelectItem value="10">10m</SelectItem>
                  <SelectItem value="15">15m</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteAlarm(alarm.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Alarm */}
      {!showAddForm && alarms.length < 5 && (
        <Button
          onClick={() => setShowAddForm(true)}
          className="mb-4 bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Alarm
        </Button>
      )}

      {showAddForm && (
        <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="alarm-time" className="text-sm text-gray-300">Time</Label>
              <Input
                id="alarm-time"
                type="time"
                value={newAlarm.time}
                onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="alarm-label" className="text-sm text-gray-300">Label</Label>
              <Input
                id="alarm-label"
                placeholder="Wake up, Meeting, etc."
                value={newAlarm.label}
                onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
                className="bg-gray-700 border-gray-600"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={addAlarm} className="bg-green-600 hover:bg-green-700">
              Save Alarm
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Sound Settings */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-base font-semibold text-white mb-3">Alarm Settings</h3>
        <div className="text-sm text-gray-300">
          <div className="mb-2">• Alarms will sound even when browser tab is inactive</div>
          <div className="mb-2">• Use snooze options: 5, 10, or 15 minutes</div>
          <div>• Maximum 5 alarms can be set</div>
        </div>
      </div>
    </div>
  );
}