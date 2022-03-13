import React, { useState, useEffect } from 'react';
import {
  UserOutlined,
  UserDeleteOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/user/userAction';
import { useDispatch, useSelector } from 'react-redux';
import * as categoryApi from '../api/categoryApi';
import * as subApi from '../api/subCategoryApi';
import {
  MDBBtn,
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
import { Affix, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  const loadCategory = async () => {
    setLoading(true);
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
      setCategory(Object.entries(subObj));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  console.log(category);

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <Affix>
      <header>
        <MDBNavbar expand='lg' light bgColor='light'>
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
              <Menu mode='horizontal'>
                {!loading &&
                  category.map((c, id) => {
                    return (
                      <SubMenu key={id} title={c[0].toUpperCase()}>
                        {c[1].map((sub) => {
                          return (
                            <Menu.Item key={sub._id}>
                              {sub.name.toUpperCase()}
                            </Menu.Item>
                          );
                        })}
                        <Menu.Item key='all'>Xem tất cả</Menu.Item>
                      </SubMenu>
                    );
                  })}
              </Menu>
              <div
                className='d-flex align-items-center justify-content-between'
                style={{ flexWrap: 'wrap' }}
              >
                <form className='d-flex input-group' style={{ width: '60%' }}>
                  <input
                    type='search'
                    className='form-control'
                    placeholder='Type query'
                    aria-label='Search'
                  />
                  <MDBBtn color='primary'>
                    <MDBIcon fas icon='search' />
                  </MDBBtn>
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
