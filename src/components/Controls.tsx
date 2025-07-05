import React from 'react';

interface ControlsProps {
  toggleTimer: () => void;
  resetTimer: () => void;
  isActive: boolean;
}

const Controls: React.FC<ControlsProps> = ({ toggleTimer, resetTimer, isActive }) => {
  return (
    <div className="controls">
      <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Controls;
