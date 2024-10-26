// src/App.tsx
import React, { useState } from 'react';
import { Layout, Button, List, Typography, InputNumber, Menu, Dropdown, Tabs } from 'antd';
import { DownOutlined, PlayCircleOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const App: React.FC = () => {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [scenes, setScenes] = useState<number>(0); // Количество сцен
  const objects = ['Player', 'Platform', 'Coin', 'Enemy', 'Background'];

  // Меню для пункта "Проект"
  const projectMenu = (
    <Menu>
      <Menu.Item key="newScene" onClick={() => handleNewScene()}>Создать сцену</Menu.Item>
      <Menu.Item key="open">Открыть</Menu.Item>
      <Menu.Item key="save">Сохранить</Menu.Item>
    </Menu>
  );

  // Меню для пункта "Правка"
  const editMenu = (
    <Menu>
      <Menu.Item key="undo">Отменить</Menu.Item>
      <Menu.Item key="redo">Повторить</Menu.Item>
    </Menu>
  );

  // Меню для пункта "О программе"
  const aboutMenu = (
    <Menu>
      <Menu.Item key="version">Версия</Menu.Item>
      <Menu.Item key="contact">Контакты</Menu.Item>
    </Menu>
  );

  // Обработчик для создания новой сцены и добавления вкладок
  const handleNewScene = () => {
    setScenes((prevScenes) => prevScenes + 1); // Увеличиваем количество сцен
  };

  return (
    <Layout style={{ height: '100vh' }}>
      {/* Верхняя панель с классическим меню */}
      <Header style={{ background: '#002140', padding: '0 16px', display: 'flex', alignItems: 'center', height: '40px' }}>
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
      </Header>
      
      {/* Второй ряд с кнопками управления */}
      <Header style={{ background: '#001529', padding: '0 16px', display: 'flex', alignItems: 'center', height: '48px' }}>
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
        {/* Вкладки для переключения между "Редактор сцены" и "Редактор логики" */}
        <Content style={{ padding: '16px', background: '#f0f2f5' }}>
          <Tabs defaultActiveKey="1" type="card">
            {Array.from({ length: scenes }, (_, i) => (
              <TabPane tab={`Сцена ${i + 1}`} key={`scene-${i + 1}`}>
                <Tabs defaultActiveKey="editor" type="card">
                  <TabPane tab="Редактор сцены" key="editor">
                    <SceneEditor selectedObject={selectedObject} setSelectedObject={setSelectedObject} objects={objects} />
                  </TabPane>
                  <TabPane tab="Редактор логики" key="logic">
                    <LogicEditor selectedObject={selectedObject} />
                  </TabPane>
                </Tabs>
              </TabPane>
            ))}
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

// Компонент для редактора сцены
const SceneEditor: React.FC<{ selectedObject: string | null, setSelectedObject: (obj: string) => void, objects: string[] }> = ({ selectedObject, setSelectedObject, objects }) => (
  <Layout>
    {/* Левая панель свойств */}
    <Sider width={250} style={{ background: '#fff', padding: '16px' }}>
      <Title level={4}>Properties</Title>
      {selectedObject ? (
        <div>
          <p>Selected Object: {selectedObject}</p>
          <div>
            <p>Position X:</p>
            <InputNumber defaultValue={0} />
          </div>
          <div>
            <p>Position Y:</p>
            <InputNumber defaultValue={0} />
          </div>
          <div>
            <p>Size:</p>
            <InputNumber defaultValue={50} />
          </div>
        </div>
      ) : (
        <p>Select an object to view its properties</p>
      )}
    </Sider>

    {/* Центральная рабочая область для рендеринга сцены */}
    <Content style={{ padding: '16px', background: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Title>Scene Editor Area</Title>
    </Content>

    {/* Правая панель со списком объектов */}
    <Sider width={250} style={{ background: '#fff', padding: '16px' }}>
      <Title level={4}>Objects</Title>
      <List
        bordered
        dataSource={objects}
        renderItem={(item) => (
          <List.Item onClick={() => setSelectedObject(item)} style={{ cursor: 'pointer' }}>
            {item}
          </List.Item>
        )}
      />
    </Sider>
  </Layout>
);

// Компонент для редактора логики
const LogicEditor: React.FC<{ selectedObject: string | null }> = ({ selectedObject }) => (
  <div style={{ padding: '16px', background: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Title level={4}>Logic Editor for {selectedObject || 'None Selected'}</Title>
    {/* Здесь можно добавить больше компонентов для редактирования логики */}
  </div>
);

export default App;
