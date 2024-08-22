import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddMovie from './movie/AddMovie';
import EditMovie from './movie/EditMovie';
import MovieList from './movie/MovieList';
import { Layout, Menu } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  display: 'flex',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
};
const contentStyle: React.CSSProperties = {
  padding: '2em',
};

const MainPage: React.FC = () => (
  <div style={containerStyle}>
    <Layout>
      <Header style={headerStyle}>
        <NavLink to='/'>MMS v1.0</NavLink>
      </Header>
      <Layout>
        <Sider>
          <Menu mode='inline' theme='dark'>
            <Menu.Item key='1' icon={<CaretRightOutlined/>}>
              <NavLink to='/'>Home Page</NavLink>
            </Menu.Item>
            <Menu.Item key='2' icon={<CaretRightOutlined/>}>
              <NavLink to='/movie'>Movie List</NavLink>
            </Menu.Item>
            <Menu.Item key='3' icon={<CaretRightOutlined/>}>
              <NavLink to='/movie/add'>Add Movie</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <div style={contentStyle}>
            <Routes>
              <Route path='/' Component={Home}></Route>
              <Route path='/movie' Component={MovieList}></Route>
              <Route path='/movie/edit/:id' Component={EditMovie}></Route>
              <Route path='/movie/add' Component={AddMovie}></Route>
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
);

export default MainPage;
