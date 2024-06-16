import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const NotFound : React.FC = () => {
  return (
    <Layout style={{height:"100vh"}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Link to='/' className="demo-logo" style={{color: 'white', fontSize:'larger', fontWeight:'bolder'}}>Cloutflow</Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content className='content'>
        <p>The page you are looking is not found !</p>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Cloutflow ©{new Date().getFullYear()} Created by Cloutflow Team
      </Footer>
    </Layout>
  )
}

export default NotFound
