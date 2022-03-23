import { cartActionType } from './cartType';

export const cartInit = () => (dispatch) => {
  dispatch({ type: cartActionType.CART_INIT });
};

export const addToCart = (product) => (dispatch) => {
  dispatch({ type: cartActionType.ADD_TO_CART, payload: product });
};

export const removeItemFromCart = (item) => (dispatch) => {
  dispatch({ type: cartActionType.REMOVE_ITEM_FROM_CART, payload: item });
};
