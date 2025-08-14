import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface QuickSettingsProps {
  is24Hour: boolean;
  onToggle24Hour: () => void;
}

export default function QuickSettings({ is24Hour, onToggle24Hour }: QuickSettingsProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
        document.body.classList.add('fullscreen-clock');
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        document.body.classList.remove('fullscreen-clock');
      });
    }
  };

  return (
    <div className="bg-[hsl(210,11%,18%)] rounded-xl shadow-lg border border-[hsl(210,11%,25%)] p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Settings</h3>
      
      <div className="space-y-4">
        {/* 24-Hour Format Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">24-Hour Format</label>
          <Switch checked={is24Hour} onCheckedChange={onToggle24Hour} />
        </div>

        {/* Full Screen Mode */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">Fullscreen Mode</label>
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="sm"
            className="bg-[hsl(120,100%,50%)] hover:bg-[hsl(120,100%,40%)] text-black border-none shadow-lg shadow-[hsl(120,100%,50%)]/30"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </Button>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">Sound Effects</label>
          <Switch 
            checked={soundEnabled} 
            onCheckedChange={setSoundEnabled}
          />
        </div>
      </div>
    </div>
  );
}
