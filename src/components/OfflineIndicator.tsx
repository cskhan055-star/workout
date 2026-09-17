import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 left-4 right-4 sm:left-auto sm:right-4 z-50 flex items-center gap-2 rounded-2xl bg-amber-500/90 text-black px-3.5 py-2 text-xs font-bold shadow-xl backdrop-blur-sm animate-bounce">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Offline Mode — All routines and exercise timers work without internet!</span>
    </div>
  );
};
