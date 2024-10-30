// SceneCanvas.tsx

import React from 'react';

const SceneCanvas: React.FC = () => {
  return (
    <div style={{ background: '#444', height: '100%', position: 'relative' }}>
      {/* Render your scene here */}
      <p style={{ color: 'white', textAlign: 'center', paddingTop: '50%' }}>
        Scene Canvas
      </p>
    </div>
  );
};

export default SceneCanvas;
