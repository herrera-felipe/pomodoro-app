import React from 'react';

interface ModeSelectorProps {
  selectMode: (mode: string) => void;
  currentMode: string;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectMode, currentMode }) => {
  return (
    <div className="mode-selector">
      <button 
        className={currentMode === 'work' ? 'active' : ''}
        onClick={() => selectMode('work')}
      >
        Work
      </button>
      <button 
        className={currentMode === 'shortBreak' ? 'active' : ''}
        onClick={() => selectMode('shortBreak')}
      >
        Short Break
      </button>
      <button 
        className={currentMode === 'longBreak' ? 'active' : ''}
        onClick={() => selectMode('longBreak')}
      >
        Long Break
      </button>
    </div>
  );
};

export default ModeSelector;
