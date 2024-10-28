import React, { useState } from 'react';
import { Layout, Button, Typography, Menu, Dropdown } from 'antd';
import {
  DownOutlined,
  PlusOutlined,
  SaveOutlined,
  PlayCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import LevelEditorContent from './components/LogicEditor/LogicEditorContent';
import LogicEditorContent from './components/SceneEditor/SceneEditorContent';

const { Header, Content } = Layout;
const { Title } = Typography;

const CustomTabs: React.FC<{
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  onAddTab: () => void;
  onRemoveTab: (tab: string) => void;
}> = ({ tabs, activeTab, onTabClick, onAddTab, onRemoveTab }) => {
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
            padding: '8px 16px',
            marginRight: '8px',
            cursor: 'pointer',
            color: activeTab === tab ? '#0958d9' : 'white',
            backgroundColor: activeTab === tab ? '#1f1f1f' : 'transparent',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
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
      <Button
        onClick={onAddTab}
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginLeft: 'auto' }}
      >
        Add Scene
      </Button>
    </div>
  );
};

const App: React.FC = () => {
  const [sceneTabs, setSceneTabs] = useState<string[]>(['Сцена 1']);
  const [activeScene, setActiveScene] = useState<string>('Сцена 1');
  const [editorTabs, setEditorTabs] = useState<{ [key: string]: string }>({
    'Сцена 1': 'levelEditor',
  });

  const handleNewScene = () => {
    const newScene = `Сцена ${sceneTabs.length + 1}`;
    setSceneTabs((prevTabs) => [...prevTabs, newScene]);
    setActiveScene(newScene);
    setEditorTabs((prevTabs) => ({ ...prevTabs, [newScene]: 'levelEditor' }));
  };

  const handleRemoveScene = (tab: string) => {
    setSceneTabs((prevTabs) => prevTabs.filter((t) => t !== tab));
    if (activeScene === tab && sceneTabs.length > 1) {
      setActiveScene(sceneTabs[0]);
    }
  };

  const handleSceneChange = (tab: string) => {
    setActiveScene(tab);
  };

  const handleEditorTabChange = (key: string) => {
    setEditorTabs((prevTabs) => ({ ...prevTabs, [activeScene]: key }));
  };

  const projectMenu = (
    <Menu>
      <Menu.Item key="newScene" onClick={handleNewScene}>
        Создать сцену
      </Menu.Item>
      <Menu.Item key="open">Открыть</Menu.Item>
      <Menu.Item key="save">Сохранить</Menu.Item>
    </Menu>
  );

  const editMenu = (
    <Menu>
      <Menu.Item key="undo">Отменить</Menu.Item>
      <Menu.Item key="redo">Повторить</Menu.Item>
    </Menu>
  );

  const aboutMenu = (
    <Menu>
      <Menu.Item key="version">Версия</Menu.Item>
      <Menu.Item key="contact">Контакты</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: '100vh', background: '#1c1c1c' }}>
      <Header
        style={{
          background: '#1f1f1f',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          height: '50px',
        }}
      >
        <Dropdown overlay={projectMenu} trigger={['click']}>
          <Button type="text" style={{ color: 'white', marginRight: '16px' }}>
            Проект <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={editMenu} trigger={['click']}>
          <Button type="text" style={{ color: 'white', marginRight: '16px' }}>
            Правка <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={aboutMenu} trigger={['click']}>
          <Button type="text" style={{ color: 'white', marginRight: '16px' }}>
            О программе <DownOutlined />
          </Button>
        </Dropdown>

        <CustomTabs
          tabs={sceneTabs}
          activeTab={activeScene}
          onTabClick={handleSceneChange}
          onAddTab={handleNewScene}
          onRemoveTab={handleRemoveScene}
        />
      </Header>

      <Header
        style={{
          background: '#1f1f1f',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          height: '48px',
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleNewScene}
          style={{ marginRight: '16px' }}
        >
          New Scene
        </Button>
        <Button type="default" icon={<SaveOutlined />} style={{ marginRight: '16px' }}>
          Save
        </Button>
        <Button type="primary" icon={<PlayCircleOutlined />}>
          Run Game
        </Button>
      </Header>

      <Layout>
        <Content style={{ padding: '16px', background: '#2e2e2e' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button
              type={editorTabs[activeScene] === 'levelEditor' ? 'primary' : 'default'}
              onClick={() => handleEditorTabChange('levelEditor')}
            >
              Редактор уровня
            </Button>
            <Button
              type={editorTabs[activeScene] === 'logicEditor' ? 'primary' : 'default'}
              onClick={() => handleEditorTabChange('logicEditor')}
            >
              Редактор логики
            </Button>
          </div>
          {editorTabs[activeScene] === 'levelEditor' ? (
            <LevelEditorContent scene={activeScene} />
          ) : (
            <LogicEditorContent scene={activeScene} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
