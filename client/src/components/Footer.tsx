export default function Footer() {
  return (
    <footer className="mt-16 bg-[hsl(210,11%,18%)] rounded-xl shadow-lg border border-[hsl(210,11%,25%)] p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-white mb-3">Features</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Large Digital Clock Display</li>
            <li>• Precision Stopwatch Timer</li>
            <li>• Multiple Timezone Support</li>
            <li>• Fullscreen Mode Available</li>
            <li>• Mobile-Friendly Design</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Use Cases</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Presentations & Meetings</li>
            <li>• Sports & Fitness Timing</li>
            <li>• Classroom Activities</li>
            <li>• Home Office Display</li>
            <li>• Event Timing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">About</h4>
          <p className="text-sm text-gray-300 mb-3">
            Free online clock and stopwatch tools designed for maximum readability and ease of use. Perfect for timing activities, presentations, and keeping track of time across different time zones.
          </p>
          <div className="text-xs text-gray-400">
            © 2024 Internet Clock. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
