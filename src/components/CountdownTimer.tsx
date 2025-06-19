
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: Date;
  className?: string;
}

const CountdownTimer = ({ endDate, className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className={`grid grid-cols-4 gap-2 ${className}`}>
      <div className="bg-black/30 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-white">{timeLeft.days}</div>
        <div className="text-xs text-white/60">Days</div>
      </div>
      <div className="bg-black/30 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-white">{timeLeft.hours}</div>
        <div className="text-xs text-white/60">Hours</div>
      </div>
      <div className="bg-black/30 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-xs text-white/60">Minutes</div>
      </div>
      <div className="bg-black/30 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-white">{timeLeft.seconds}</div>
        <div className="text-xs text-white/60">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
