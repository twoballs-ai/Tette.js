// components/Tabs.tsx

import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  onRemoveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick, onRemoveTab }) => {
  // Максимальная и минимальная ширина вкладки
  const maxTabWidth = 150;
  const minTabWidth = 80;

  // Рассчитываем ширину каждой вкладки в зависимости от их количества
  const containerWidth = 1000; // Задаем фиксированную ширину контейнера, или можно вычислять динамически
  const tabWidth = Math.max(minTabWidth, Math.min(maxTabWidth, containerWidth / tabs.length));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#2e2e2e',
        borderRadius: '4px',
        padding: '8px',
        color: 'white',
        flex: 1,
      }}
    >
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => onTabClick(tab)}
          style={{
            width: `${tabWidth}px`, // Динамическая ширина вкладки
            padding: '8px 16px',
            marginRight: '8px',
            cursor: 'pointer',
            color: activeTab === tab ? '#0958d9' : 'white',
            backgroundColor: activeTab === tab ? '#1f1f1f' : 'transparent',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0, // Запрещаем уменьшение ширины вкладок
          }}
        >
          {tab}
          <CloseOutlined
            onClick={(e) => {
              e.stopPropagation();
              onRemoveTab(tab);
            }}
            style={{ fontSize: '12px', color: '#ff4d4f', marginLeft: '8px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default Tabs;
