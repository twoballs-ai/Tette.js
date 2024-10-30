// PropertiesPanel.tsx

import React from 'react';

const PropertiesPanel: React.FC = () => {
  return (
    <div style={{ background: '#2c2c2c', height: '100%' }}>
      <div className="panel-header" style={{ padding: '8px', background: '#1f1f1f', cursor: 'move' }}>
        <span style={{ color: 'white' }}>Properties</span>
      </div>
      {/* Properties of the selected object */}
      <div style={{ padding: '8px', color: 'white' }}>
        <p>Property 1</p>
        <p>Property 2</p>
        <p>Property 3</p>
      </div>
    </div>
  );
};

export default PropertiesPanel;
