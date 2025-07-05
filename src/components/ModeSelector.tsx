import React from 'react';

interface ModeSelectorProps {
  selectMode: (mode: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectMode }) => {
  return (
    <div className="mode-selector">
      <button onClick={() => selectMode('work')}>Work</button>
      <button onClick={() => selectMode('shortBreak')}>Short Break</button>
      <button onClick={() => selectMode('longBreak')}>Long Break</button>
    </div>
  );
};

export default ModeSelector;
