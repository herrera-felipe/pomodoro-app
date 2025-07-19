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
    const root = document.documentElement;
    let bgColor, btnBgColor, btnBorderColor;

    switch (mode) {
      case 'work':
        bgColor = 'radial-gradient(circle, #6c33d6, #531CB3)';
        btnBgColor = '#531CB3';
        btnBorderColor = '#ffffff';
        break;
      case 'shortBreak':
        bgColor = 'radial-gradient(circle, #a966cc, #944BBB)';
        btnBgColor = '#944BBB';
        btnBorderColor = '#ffffff';
        break;
      case 'longBreak':
        bgColor = 'radial-gradient(circle, #bfa0d4, #AA7BC3)';
        btnBgColor = '#AA7BC3';
        btnBorderColor = '#ffffff';
        break;
      default:
        bgColor = 'radial-gradient(circle, #6c33d6, #531CB3)';
        btnBgColor = '#531CB3';
        btnBorderColor = '#ffffff';
    }

    document.body.style.background = bgColor;
    root.style.setProperty('--button-bg-color', btnBgColor);
    root.style.setProperty('--button-border-color', btnBorderColor);

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
      <h1>Pomodoro Timer</h1>
      <ModeSelector selectMode={selectMode} />
      <Timer time={time} />
      <Controls toggleTimer={toggleTimer} resetTimer={resetTimer} isActive={isActive} />
      <audio ref={audioRef} src={notificationSound} />
    </div>
  );
};

export default App;
