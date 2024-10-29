// App.tsx

import React, { useState } from 'react';
import { Layout, Button, Menu, Dropdown, Space } from 'antd';
import {
  DownOutlined,
  PlusOutlined,
  SaveOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import LevelEditorContent from './components/LogicEditor/LogicEditorContent';
import LogicEditorContent from './components/SceneEditor/SceneEditorContent';
import exportProjectToZip from './utils/exportProjectToZip';
import saveProjectToTetteFile from './utils/saveProjectToTetteFile';
import Tabs from './components/Tabs/Tabs';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [sceneTabs, setSceneTabs] = useState<string[]>(['Сцена 1']);
  const [activeScene, setActiveScene] = useState<string>('Сцена 1');
  const [editorTabs, setEditorTabs] = useState<{ [key: string]: string }>({ 'Сцена 1': 'levelEditor' });

  const createNewProject = () => ({
    projectName: 'Новый проект',
    version: '1.0',
    scenes: [],
    resources: {},
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

  const handleSaveProject = () => {
    const projectData = createNewProject();
    saveProjectToTetteFile(projectData);
  };

  const handleExportProject = () => {
    const projectData = createNewProject();
    exportProjectToZip(projectData);
  };

  const projectMenuItems = [
    { label: 'Создать сцену', key: 'newScene', onClick: handleNewScene },
    { label: 'Сохранить проект', key: 'save', onClick: handleSaveProject },
    { label: 'Экспортировать проект', key: 'export', onClick: handleExportProject },
  ];

  const editMenuItems = [
    { label: 'Отменить', key: 'undo' },
    { label: 'Повторить', key: 'redo' },
  ];

  const aboutMenuItems = [
    { label: 'Версия', key: 'version' },
    { label: 'Контакты', key: 'contact' },
  ];

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
        <Dropdown menu={{ items: projectMenuItems }} trigger={['click']}>
          <Space>
            <Button type="text" style={{ color: 'white' }}>
              Проект
            </Button>
            <DownOutlined />
          </Space>
        </Dropdown>

        <Dropdown menu={{ items: editMenuItems }} trigger={['click']}>
          <Space>
            <Button type="text" style={{ color: 'white', marginLeft: '16px' }}>
              Правка
            </Button>
            <DownOutlined />
          </Space>
        </Dropdown>

        <Dropdown menu={{ items: aboutMenuItems }} trigger={['click']}>
          <Space>
            <Button type="text" style={{ color: 'white', marginLeft: '16px' }}>
              О программе
            </Button>
            <DownOutlined />
          </Space>
        </Dropdown>

        <Tabs
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
        <Button
          type="default"
          icon={<SaveOutlined />}
          style={{ marginRight: '16px' }}
          onClick={handleSaveProject}
        >
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
