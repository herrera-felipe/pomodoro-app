import React, { useState, useEffect, useRef } from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';
import notificationSound from './assets/notification.mp3';

const App: React.FC = () => {
  const [mode, setMode] = useState('work');
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      playSound();
      handleModeChange();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time]);

  useEffect(() => {
    document.body.className = `${mode}-mode`;
  }, [mode]);

  const handleModeChange = () => {
    if (mode === 'work') {
      setPomodoroCount(pomodoroCount + 1);
      if (pomodoroCount > 0 && (pomodoroCount + 1) % 4 === 0) {
        setMode('longBreak');
        setTime(15 * 60);
      } else {
        setMode('shortBreak');
        setTime(5 * 60);
      }
    } else {
      setMode('work');
      setTime(25 * 60);
    }
  };

  const toggleTimer = () => {
    if (!isActive) {
      playSound();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setTime(25 * 60);
    setPomodoroCount(0);
  };

  const selectMode = (newMode: string) => {
    setIsActive(false);
    setMode(newMode);
    switch (newMode) {
      case 'work':
        setTime(25 * 60);
        break;
      case 'shortBreak':
        setTime(5 * 60);
        break;
      case 'longBreak':
        setTime(15 * 60);
        break;
      default:
        setTime(25 * 60);
    }
  };

  return (
    <div className="app">
      <h1>Rune of Focus</h1>
      <ModeSelector selectMode={selectMode} currentMode={mode} />
      <div className="divider"></div>
      <Timer time={time} />
      <div className="divider"></div>
      <Controls toggleTimer={toggleTimer} resetTimer={resetTimer} isActive={isActive} />
      <audio ref={audioRef} src={notificationSound} />
    </div>
  );
};

export default App;
