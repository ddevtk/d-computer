import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { notification, Row } from 'antd';
import { formatPrice } from '../utils/formatPrice';
import { useDispatch } from 'react-redux';
import * as cartApi from '../api/cartApi';
import { useCookies } from 'react-cookie';
import { emptyCart } from '../redux/cart/cartAction';

export default function PaymentForm({ finalTotal }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [cookie] = useCookies(['user']);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      setIsLoading(true);
      const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const res1 = await cartApi.createOrder(
            result.paymentIntent,
            cookie.user.token
          );

          console.log(res1);
          const res = await cartApi.saveCart([], 0, 0, cookie.user.token);

          console.log(res);
          dispatch(emptyCart());
          setSucceeded(true);
          notification.success({
            message: 'Thanh toán thành công',
            duration: 3,
          });
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <h5 className='text-center text-danger mt-4'>
        Tổng tiền: {formatPrice(finalTotal)}
      </h5>
      <Row justify='center' align='middle' className='mt-2'>
        <form
          className='checkout-form'
          id='payment-form'
          onSubmit={handleSubmit}
        >
          <PaymentElement id='payment-element' />
          <button
            disabled={isLoading || succeeded || !stripe || !elements}
            id='submit'
          >
            <span id='button-text'>
              {isLoading ? (
                <div className='spinner' id='spinner'></div>
              ) : (
                'Pay now'
              )}
            </span>
          </button>
          {message && <div id='payment-message'>{message}</div>}
        </form>
      </Row>
      <p className='text-danger text-center mt-2'>
        Nhập số tài khoản 4242 4242 4242 4242 để thanh toán
      </p>
    </>
  );
}
