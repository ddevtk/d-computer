import React, { useState } from 'react';
import { MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { auth } from '../../firebase/firebase.utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {};

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <MDBCol md='12' size='12' className='mt-4'>
              <MDBInput
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label='Email address'
                className='mb-2'
              />
              <MDBInput
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label='Password'
                className='mb-4'
              ></MDBInput>
            </MDBCol>
            <Button
              shape='round'
              type='primary'
              block
              size='large'
              icon={<MailOutlined />}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className='mb-2'
              disabled={!email || password.length < 6}
            >
              Login with email and password
            </Button>
            <Button
              shape='round'
              danger
              type='primary'
              block
              size='large'
              icon={<GoogleOutlined />}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Login with google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
