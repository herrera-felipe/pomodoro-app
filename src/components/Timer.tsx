import React, { useEffect } from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    document.title = `${formatTime(time)} - Pomodoro Timer`;
  }, [time]);

  return (
    <div className="timer">
      <p>{formatTime(time)}</p>
      <div className="signature">
        <span className="signature-oz">Oz</span><span className="signature-dev">Dev</span>
      </div>
    </div>
  );
};

export default Timer;
