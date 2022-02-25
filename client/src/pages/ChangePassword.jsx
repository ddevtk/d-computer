import { Alert, Layout, notification, Spin } from 'antd';
import { MDBInput } from 'mdb-react-ui-kit';

import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import UserNav from '../components/UserNav';
import { getAuth, updatePassword } from 'firebase/auth';

const ChangePassword = () => {
  const [error, setError] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const handleSubmit = async (e) => {
    const auth = getAuth();
    const user = auth.currentUser;

    e.preventDefault();
    if (newPw !== confirmPw) {
      setError('Mật khẩu không khớp');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      try {
        setLoading(true);
        await updatePassword(user, newPw);
        notification.success({ message: 'Cập nhật mật khẩu thành công' });
        setNewPw('');
        setConfirmPw('');
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff', flexDirection: 'row' }}
    >
      <UserNav selectedKey='change-password' />

      <Content
        style={{
          padding: '0 24px',
          minHeight: 280,
          maxWidth: '40rem',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className='form-outline mb-4'>
            <MDBInput
              required
              label='Mật khẩu mới'
              type='password'
              className='form-control'
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>
          <div className='form-outline mb-4'>
            <MDBInput
              required
              label='Xác nhận mật khẩu'
              type='password'
              className='form-control'
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
          </div>
          {error && (
            <Alert showIcon className='mt-2' message={error} type='error' />
          )}

          <button type='submit' className='btn btn-primary btn-block mb-4 mt-2'>
            {loading ? (
              <span>
                Chờ chút{' '}
                <Spin
                  size='small'
                  style={{ color: '#fff' }}
                  indicator={antIcon}
                />
              </span>
            ) : (
              'Cập nhật mật khẩu'
            )}
          </button>
        </form>
      </Content>
    </Layout>
  );
};

export default ChangePassword;
