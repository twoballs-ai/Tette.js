import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const SceneEditorContent: React.FC<{ scene: string }> = ({ scene }) => (
  <div
    style={{
      padding: '16px',
      background: '#1c1c1c',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}
  >
    <Title level={4} style={{ color: 'white' }}>
      Редактор уровня для {scene}
    </Title>
  </div>
);

export default SceneEditorContent;
