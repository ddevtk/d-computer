import { Alert, message } from 'antd';
import { MDBInput } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginWithEmailAndPassword,
  loginWithFacebook,
  loginWithGoogle,
} from '../../redux/user/userAction';
import { userActionType } from '../../redux/user/userType';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const key = 'updatable';

  const { isSigningIn, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if (user) {
  //   navigate('/');
  // }

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

  const signInWithGoogleHandler = () => {
    dispatch(loginWithGoogle());
  };
  // const signInWithFacebookHandler = () => {
  //   dispatch(loginWithFacebook());
  // };

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
                autoFocus
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
              Sign in
            </button>

            <div className='divider d-flex align-items-center my-4'>
              <p className='text-center fw-bold mx-3 mb-0 text-muted'>OR</p>
            </div>
            <></>
          </form>
          <button
            className='btn btn-primary btn-lg btn-block'
            style={{ backgroundColor: '#1266f1' }}
            onClick={signInWithGoogleHandler}
          >
            <i className='fab fa-google me-2'></i>Continue with Google
          </button>
          {/* <button
            className='btn btn-primary btn-lg btn-block'
            style={{ backgroundColor: '#3b5998' }}
            onClick={signInWithFacebookHandler}
          >
            <i className='fab fa-facebook-f me-2'></i>Continue with Facebook
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
