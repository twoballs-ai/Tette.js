import React from 'react';

interface Props {
  onClose: () => void;
}

const SceneObjectsPanel: React.FC<Props> = ({ onClose }) => {
  return (
    <div style={{ background: '#2c2c2c', height: '100%' }}>
      <div
        className="panel-header"
        style={{
          padding: '8px',
          background: '#1f1f1f',
          cursor: 'move',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: 'white' }}>Scene Objects</span>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white' }}>
          X
        </button>
      </div>
      {/* List of scene objects */}
      <div style={{ padding: '8px', color: 'white' }}>
        <p>Object 1</p>
        <p>Object 2</p>
        <p>Object 3</p>
      </div>
    </div>
  );
};

export default SceneObjectsPanel;
