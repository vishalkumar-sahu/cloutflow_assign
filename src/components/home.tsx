import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Modal, FloatButton } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import CriteriaSelection from './criteriaSelection';
import InfluencerResults from './influencerResults';
import '../styles/home.css'
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Influencer Search</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className='innerContent'
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, height:"70vh" }}
        >
          <Sider className='sideBar' style={{ background: colorBgContainer}}>
            <CriteriaSelection></CriteriaSelection>
          </Sider>
          <FloatButton
            shape="circle"
            type="primary"
            icon={<FilterFilled />}
            onClick={showModal}
            className='filterMobileView'
          />
          <Modal 
            title="Basic Modal" 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel} 
            okButtonProps={{ style: { visibility: 'hidden' } }}
            cancelButtonProps={{ style: { visibility: 'hidden' } }}
          >
            <CriteriaSelection></CriteriaSelection>
          </Modal>
          <Content className='mainContent'>
            <InfluencerResults></InfluencerResults>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Cloutflow ©{new Date().getFullYear()} Created by Cloutflow Team
      </Footer>
    </Layout>
  );
};

export default Home;