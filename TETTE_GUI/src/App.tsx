// src/App.tsx
import React, { useState } from 'react';
import { Layout, Button, Typography, Menu, Dropdown, Tabs } from 'antd';
import { DownOutlined, PlusOutlined, SaveOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const App: React.FC = () => {
  const [sceneTabs, setSceneTabs] = useState<string[]>(['Сцена 1']); // Вкладки для сцен
  const [activeScene, setActiveScene] = useState<string>('Сцена 1'); // Активная сцена
  const [editorTabs, setEditorTabs] = useState<{ [key: string]: string }>({ 'Сцена 1': 'levelEditor' }); // Активные под-вкладки для каждой сцены

  // Добавление новой сцены
  const handleNewScene = () => {
    const newScene = `Сцена ${sceneTabs.length + 1}`;
    setSceneTabs((prevTabs) => [...prevTabs, newScene]);
    setActiveScene(newScene);
    setEditorTabs((prevTabs) => ({ ...prevTabs, [newScene]: 'levelEditor' })); // Устанавливаем под-вкладку по умолчанию
  };

  // Обработчик для смены активной сцены
  const handleSceneChange = (key: string) => {
    setActiveScene(key);
  };

  // Обработчик для смены активной под-вкладки редактора для текущей сцены
  const handleEditorTabChange = (key: string) => {
    setEditorTabs((prevTabs) => ({ ...prevTabs, [activeScene]: key }));
  };

  // Меню "Проект"
  const projectMenu = (
    <Menu>
      <Menu.Item key="newScene" onClick={handleNewScene}>
        Создать сцену
      </Menu.Item>
      <Menu.Item key="open">Открыть</Menu.Item>
      <Menu.Item key="save">Сохранить</Menu.Item>
    </Menu>
  );

  // Меню "Правка"
  const editMenu = (
    <Menu>
      <Menu.Item key="undo">Отменить</Menu.Item>
      <Menu.Item key="redo">Повторить</Menu.Item>
    </Menu>
  );

  // Меню "О программе"
  const aboutMenu = (
    <Menu>
      <Menu.Item key="version">Версия</Menu.Item>
      <Menu.Item key="contact">Контакты</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: '100vh', background: '#1c1c1c' }}>
      {/* Верхняя панель с классическим меню и вкладками для сцен */}
      <Header style={{ background: '#1f1f1f', padding: '0 16px', display: 'flex', alignItems: 'center', height: '50px' }}>
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

        {/* Вкладки сцен с темным стилем */}
        <Tabs
          activeKey={activeScene}
          onChange={handleSceneChange}
          type="card"
          style={{
            marginLeft: '16px',
            flex: 1,
            // background: 'red',
            borderRadius: '4px',
            color: 'white',
          }}
          tabBarStyle={{
            backgroundColor: '#2e2e2e',
            // color: 'red',
            borderBottom: '1px solid #444',
          }}
        >
          {sceneTabs.map((tab) => (
            <TabPane tab={<span style={{ color: '#0958d9' }}>{tab}</span>} key={tab} />
          ))}
        </Tabs>
      </Header>

      {/* Второй ряд с кнопками управления */}
      <Header style={{ background: '#1f1f1f', padding: '0 16px', display: 'flex', alignItems: 'center', height: '48px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleNewScene} style={{ marginRight: '16px' }}>
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
        {/* Вкладки для "Редактор уровня" и "Редактор логики" с темным стилем */}
        <Content style={{ padding: '16px', background: '#2e2e2e' }}>
          <Tabs
            activeKey={editorTabs[activeScene] || 'levelEditor'}
            onChange={handleEditorTabChange}
            type="line"
            tabBarStyle={{
              backgroundColor: '#2e2e2e',
              color: 'white',
              borderBottom: '1px solid #444',
            }}
          >
            <TabPane tab={<span style={{ color: 'white' }}>Редактор уровня</span>} key="levelEditor">
              <LevelEditorContent scene={activeScene} />
            </TabPane>
            <TabPane tab={<span style={{ color: 'white' }}>Редактор логики</span>} key="logicEditor">
              <LogicEditorContent scene={activeScene} />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

// Компонент для отображения редактора уровня
const LevelEditorContent: React.FC<{ scene: string }> = ({ scene }) => (
  <div style={{ padding: '16px', background: '#1c1c1c', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Title level={4} style={{ color: 'white' }}>Редактор уровня для {scene}</Title>
  </div>
);

// Компонент для отображения редактора логики
const LogicEditorContent: React.FC<{ scene: string }> = ({ scene }) => (
  <div style={{ padding: '16px', background: '#1c1c1c', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Title level={4} style={{ color: 'white' }}>Редактор логики для {scene}</Title>
  </div>
);

export default App;
