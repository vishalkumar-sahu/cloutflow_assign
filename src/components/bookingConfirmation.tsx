import React from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme, Rate } from 'antd';
import { RootState } from '../app/store';
import { Card, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/bookingConfirmation.css'
import NotFound from './notFound';

const { Header, Content, Footer } = Layout;

const BookingConfirmation: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { selectedInfluencer } = useSelector((state: RootState) => state.influencer);
  const navigate = useNavigate();

  if (!selectedInfluencer) {
    return <NotFound />;
  }

  const handleConfirm = () => {
    alert('Booking confirmed!');
    navigate('/');
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
          <Breadcrumb.Item>Influencer</Breadcrumb.Item>
          <Breadcrumb.Item>{selectedInfluencer.name}</Breadcrumb.Item>
          <Breadcrumb.Item>Booking</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className='innerContent'
          style={{ background: colorBgContainer, borderRadius: borderRadiusLG, height:"70vh" }}
        >
          <Card className='booking-card' style={{fontSize:'20px'}} title="Booking Confirmation">
            <p>Name : <strong>{selectedInfluencer.name}</strong></p>
            <p>Cost : <strong>{selectedInfluencer.cost}</strong></p>
            <div>Rating : {
                <Rate
                  tooltips={[
                    selectedInfluencer.rating.toString(),
                    selectedInfluencer.rating.toString(),
                    selectedInfluencer.rating.toString(),
                    selectedInfluencer.rating.toString(),
                    selectedInfluencer.rating.toString(),
                  ]}
                  disabled
                  allowHalf
                  defaultValue={selectedInfluencer.rating}
                  className="rating"
                />
            }</div>
            <p>Followers : <strong>{selectedInfluencer.follower}</strong></p>
            <Button style={{float:'right', fontSize:'large'}} type="primary" onClick={handleConfirm}>Confirm Booking</Button>
          </Card>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Cloutflow ©{new Date().getFullYear()} Created by Cloutflow Team
      </Footer>
    </Layout>
  );
};

export default BookingConfirmation;
