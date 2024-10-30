// App.tsx

import React, { useState, useEffect } from 'react';
import { Layout, Button, Dropdown, Space, Drawer, Radio } from 'antd';
import { DownOutlined, PlusOutlined, SaveOutlined, PlayCircleOutlined, MenuOutlined } from '@ant-design/icons';
import LevelEditorContent from './components/LogicEditor/LogicEditorContent';
import LogicEditorContent from './components/SceneEditor/SceneEditorContent';
import Tabs from './components/Tabs/Tabs';

import {
  saveProjectData,
  loadProjectData,
  saveSceneData,
  loadSceneData,
  deleteSceneData,
  updateOpenedScenes,
  loadOpenedScenes,
} from './utils/storageUtils';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [sceneTabs, setSceneTabs] = useState<string[]>([]);
  const [activeScene, setActiveScene] = useState<string>('');
  const [editorTabs, setEditorTabs] = useState<{ [key: string]: string }>({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerPlacement, setDrawerPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('left');

  // Загрузка данных при инициализации
  useEffect(() => {
    const projectData = loadProjectData();
    if (projectData) {
      setSceneTabs(projectData.scenes);
    }

    const openScenes = loadOpenedScenes();
    if (openScenes.length) {
      setSceneTabs(openScenes.map((scene) => scene.key));
    }
  }, []);

  // Открытие и закрытие выезжающего меню
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const handleNewScene = () => {
    const newScene = `Сцена ${sceneTabs.length + 1}`;
    const newSceneData = { sceneName: newScene, objects: [], settings: {} };

    setSceneTabs((prevTabs) => [...prevTabs, newScene]);
    setActiveScene(newScene);
    setEditorTabs((prevTabs) => ({ ...prevTabs, [newScene]: 'levelEditor' }));

    saveSceneData(newScene, newSceneData);

    const projectData = loadProjectData();
    if (projectData) {
      projectData.scenes.push(newScene);
      saveProjectData(projectData);
    }

    const updatedOpenScenes = [...sceneTabs, newScene].map((title) => ({
      title,
      key: title,
      state: editorTabs[title] || 'levelEditor',
    }));
    updateOpenedScenes(updatedOpenScenes);
  };

  const handleRemoveScene = (tab: string) => {
    setSceneTabs((prevTabs) => prevTabs.filter((t) => t !== tab));
    deleteSceneData(tab);

    if (activeScene === tab && sceneTabs.length > 1) {
      setActiveScene(sceneTabs[0]);
    }

    const updatedOpenScenes = sceneTabs.filter((t) => t !== tab).map((title) => ({
      title,
      key: title,
      state: editorTabs[title] || 'levelEditor',
    }));
    updateOpenedScenes(updatedOpenScenes);
  };

  const handleSceneChange = (tab: string) => {
    setActiveScene(tab);
  };

  const handleEditorTabChange = (key: string) => {
    setEditorTabs((prevTabs) => ({ ...prevTabs, [activeScene]: key }));

    const updatedOpenScenes = sceneTabs.map((title) => ({
      title,
      key: title,
      state: editorTabs[title] || 'levelEditor',
    }));
    updateOpenedScenes(updatedOpenScenes);
  };

  const handleSaveProject = () => {
    const projectData = loadProjectData();
    if (projectData) saveProjectData(projectData);
  };

  const projectMenuItems = [
    { label: 'Создать сцену', key: 'newScene', onClick: handleNewScene },
    { label: 'Сохранить проект', key: 'save', onClick: handleSaveProject },
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
      {/* Верхний Header с меню и вкладками */}
      <Header style={{ background: '#1f1f1f', padding: '0 16px', display: 'flex', height: '60px' }}>
        <Dropdown menu={{ items: projectMenuItems }} trigger={['click']}>
          <Space>
            <Button type="text" style={{ color: 'white' }}>Проект</Button>
            <DownOutlined />
          </Space>
        </Dropdown>

        <Dropdown menu={{ items: editMenuItems }} trigger={['click']}>
          <Space>
            <Button type="text" style={{ color: 'white', marginLeft: '16px' }}>Правка</Button>
            <DownOutlined />
          </Space>
        </Dropdown>

        <Dropdown menu={{ items: aboutMenuItems }} trigger={['click']}>
          <Space>
            <Button type="text" style={{ color: 'white', marginLeft: '16px' }}>О программе</Button>
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

      {/* Разделенный Header с управлением */}
      <Header
        style={{
          background: '#1f1f1f',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '48px',
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          style={{ color: 'white' }}
        />

        <Space>
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
            onClick={handleSaveProject}
            style={{ marginRight: '16px' }}
          >
            Save
          </Button>
          <Button type="primary" icon={<PlayCircleOutlined />}>
            Run Game
          </Button>
        </Space>

        <div style={{ width: '48px' }} />
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

      {/* Выезжающее меню для редактирования параметров */}
      <Drawer
        title="Параметры проекта"
        placement={drawerPlacement}
        onClose={toggleDrawer}
        open={drawerVisible}
      >
        <p>Здесь можно редактировать параметры проекта.</p>


      </Drawer>
    </Layout>
  );
};

export default App;
