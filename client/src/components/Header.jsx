import React, { useState, useEffect } from 'react';
import {
  UserOutlined,
  UserDeleteOutlined,
  AppstoreOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/user/userAction';
import { useDispatch, useSelector } from 'react-redux';
import * as categoryApi from '../api/categoryApi';
import * as subApi from '../api/subCategoryApi';
import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import logo from '../images/logo.png';
import { Affix, Form, Input, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);
  const [menuItem, setMenuItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [title, setTitle] = useState('');

  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  const loadCategory = async () => {
    try {
      const subRes = await subApi.getAllSubCategories();
      const categoryRes = await categoryApi.getAllCategories();

      let subObj = subRes.data.reduce((acc, obj) => {
        let key = obj['parent']['slug'];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

      categoryRes.data.forEach((category) => {
        if (!subObj[category.slug]) {
          subObj[category.slug] = [];
        }
      });

      setMenuItem(Object.entries(subObj));
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinish = (e) => {
    e.preventDefault();
    title && navigate(`/product/?title=${title.trimEnd().trimStart()}`);
    setTitle('');
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <Affix>
      <header>
        <MDBNavbar expand='lg' style={{ backgroundColor: '#f8f8f8' }}>
          <MDBContainer fluid>
            <MDBNavbarToggler
              type='button'
              data-target='#navbarTogglerDemo03'
              aria-controls='navbarTogglerDemo03'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowNavNoTogglerThird(!showNavNoTogglerThird)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <Link to='/'>
              <MDBNavbarBrand>
                <img src={logo} height='50' alt='MDB Logo' loading='lazy' />
              </MDBNavbarBrand>
            </Link>
            <MDBCollapse
              navbar
              show={showNavNoTogglerThird}
              style={{ justifyContent: 'space-between' }}
            >
              <Menu mode='horizontal' multiple>
                {!loading && (
                  <SubMenu
                    key='sanpham'
                    style={{ padding: '0 1rem 0 0' }}
                    title={
                      <Link className='hover-link' to='/product'>
                        SẢN PHẨM
                      </Link>
                    }
                  ></SubMenu>
                )}
                {!loading &&
                  menuItem.map((c, id) => {
                    if (c[1].length === 0) {
                      return (
                        <SubMenu
                          key={id}
                          style={{ padding: '0 1rem 0 0' }}
                          title={
                            <Link
                              to={`/category/${c[0]}`}
                              className='hover-link'
                            >
                              {c[0].toUpperCase()}
                            </Link>
                          }
                        ></SubMenu>
                      );
                    }

                    return (
                      <SubMenu
                        key={id}
                        title={
                          <Link className='hover-link' to={`/category/${c[0]}`}>
                            {c[0].toUpperCase()}
                          </Link>
                        }
                        style={{ padding: '0 1rem 0 0' }}
                      >
                        {c[1].map((sub) => {
                          return (
                            <Menu.Item key={sub._id}>
                              <Link
                                to={`/sub/${sub.slug}`}
                                className='hover-link'
                              >
                                {sub.name.toUpperCase()}
                              </Link>
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  })}
              </Menu>
              <div className='d-flex align-items-center justify-content-end'>
                <form
                  className='d-flex justify-content-end'
                  onClick={() => setSearch(true)}
                  onSubmit={onFinish}
                >
                  <Input
                    className={`d-flex ${search ? 'search-normal' : ''}`}
                    style={{
                      width: '20%',
                      marginRight: '0.5rem',
                      borderRadius: '1rem',
                    }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size='middle'
                    placeholder='Nhập nội dung tìm kiếm...'
                    suffix={<SearchOutlined />}
                  />
                </form>
                <div className='d-flex'>
                  <Link className='text-reset me-2' to=''>
                    <i className='fas fa-shopping-cart'></i>
                  </Link>
                  {!user && (
                    <Link
                      className='text-reset d-flex align-items-center'
                      to='/login'
                      style={{ marginLeft: '0.2rem' }}
                    >
                      <UserOutlined /> Đăng nhập
                    </Link>
                  )}
                  {user && (
                    <MDBDropdown>
                      <MDBDropdownToggle className='text-reset' tag='a'>
                        <img
                          src={user.avatar}
                          className='rounded-circle'
                          height='25'
                          alt='Black and White Portrait of a Man'
                          loading='lazy'
                          style={{ marginRight: '0.2rem' }}
                        />
                        {user.name}
                      </MDBDropdownToggle>

                      <MDBDropdownMenu>
                        {user && user.role === 'subscriber' && (
                          <MDBDropdownItem>
                            <MDBDropdownLink>
                              <Link
                                to='/user/history'
                                className='d-flex align-items-center text-reset'
                              >
                                <AppstoreOutlined /> History
                              </Link>
                            </MDBDropdownLink>
                          </MDBDropdownItem>
                        )}
                        {user && user.role === 'admin' && (
                          <MDBDropdownItem>
                            <MDBDropdownLink>
                              <Link
                                to='/admin/dashboard'
                                className='d-flex align-items-center text-reset'
                              >
                                <AppstoreOutlined className='mx-2' /> Dashboard
                              </Link>
                            </MDBDropdownLink>
                          </MDBDropdownItem>
                        )}
                        <MDBDropdownItem onClick={logoutHandler}>
                          <MDBDropdownLink className='d-flex align-items-center'>
                            <UserDeleteOutlined className='mx-2' /> Đăng xuất
                          </MDBDropdownLink>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  )}
                </div>
              </div>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </header>
    </Affix>
  );
};

export default Header;
