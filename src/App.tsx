import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';

const App: React.FC = () => {
  const [mode, setMode] = useState('work');
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      handleModeChange();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time]);

  useEffect(() => {
    document.body.style.backgroundColor = 
      mode === 'work' ? '#282c34' : mode === 'shortBreak' ? '#3a5a40' : '#588157';
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
    </div>
  );
};

export default App;
