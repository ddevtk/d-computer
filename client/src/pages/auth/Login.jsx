import { Alert, message, notification } from 'antd';
import { MDBInput, MDBSpinner } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../../redux/user/userAction';
import { userActionType } from '../../redux/user/userType';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const key = 'updatable';

  const { isSigningIn, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
      return;
    }
    dispatch(loginWithEmailAndPassword(email, password));
  };
  if (isSigningIn === true) {
    message.loading({ content: 'Loading...', key });
  }
  if (isSigningIn === false) {
    message.success({
      content: 'Sign in successfully',
      key,
      duration: 2,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  useEffect(() => {
    return () => {
      dispatch({ type: userActionType.CLEAN_STATE });
    };
  }, [dispatch]);

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h3 className='mb-4'>Login</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-outline mb-4'>
              <MDBInput
                label='Email address'
                type='email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-outline mb-4'>
              <MDBInput
                label='Password'
                type='password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isError && (
                <Alert
                  showIcon
                  className='mt-2'
                  message={'Password must be at least 6 characters'}
                  type='error'
                />
              )}
              {error && (
                <Alert showIcon className='mt-2' message={error} type='error' />
              )}
            </div>

            <div className='row mb-4'>
              <div className='col d-flex justify-content-between'>
                <p>
                  Not a member? <Link to='/register'>Register</Link>
                </p>
                <a href='#!'>Forgot password?</a>
              </div>
            </div>

            <button type='submit' className='btn btn-primary btn-block mb-4'>
              {/* {isSigningIn ? (
                <div className='d-flex align-items-center justify-content-center'>
                  <MDBSpinner size='sm' color='light' />
                  <span style={{ marginLeft: '5px' }}> Loading...</span>
                </div>
              ) : (
                'Sign in'
              )} */}
              Sign in
            </button>

            <div className='text-center d-flex align-items-center justify-content-center'>
              or sign up with:{' '}
              <button
                type='button'
                className='btn btn-primary btn-floating mx-1'
              >
                <i className='fab fa-google'></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
