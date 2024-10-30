import React, { useState, useEffect } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import SceneCanvas from './SceneCanvas';
import SceneObjectsPanel from './SceneObjectsPanel';
import PropertiesPanel from './PropertiesPanel';

const initialLayout: Layout[] = [
  { i: 'objectsPanel', x: 0, y: 0, w: 2, h: 10 },
  { i: 'sceneCanvas', x: 2, y: 0, w: 8, h: 10 },
  { i: 'propertiesPanel', x: 10, y: 0, w: 2, h: 10 },
];

const SceneEditor: React.FC = () => {
  const [layout, setLayout] = useState<Layout[]>(initialLayout);
  const [panels, setPanels] = useState({
    objectsPanel: true,
    propertiesPanel: true,
  });

  useEffect(() => {
    // Load layout from localStorage
    const savedLayout = localStorage.getItem('sceneEditorLayout');
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }
  }, []);

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    // Save layout to localStorage
    localStorage.setItem('sceneEditorLayout', JSON.stringify(newLayout));
  };

  const handleClosePanel = (panelKey: string) => {
    setPanels((prev) => ({ ...prev, [panelKey]: false }));
  };

  const filteredLayout = layout.filter((item) => panels[item.i as keyof typeof panels] !== false);

  return (
    <GridLayout
      className="layout"
      layout={filteredLayout}
      cols={12}
      rowHeight={30}
      width={1200}
      draggableHandle=".panel-header"
      onLayoutChange={onLayoutChange}
    >
      {panels.objectsPanel && (
        <div key="objectsPanel">
          <SceneObjectsPanel onClose={() => handleClosePanel('objectsPanel')} />
        </div>
      )}
      <div key="sceneCanvas">
        <SceneCanvas />
      </div>
      {panels.propertiesPanel && (
        <div key="propertiesPanel">
          <PropertiesPanel onClose={() => handleClosePanel('propertiesPanel')} />
        </div>
      )}
    </GridLayout>
  );
};

export default SceneEditor;
