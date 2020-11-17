import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import { productListReducer } from './reducers/productListReducer';
import { productDetailsReducer } from './reducers/productDetailsReducer';
import { cartReducer } from './reducers/cartReducer';
import { userAuthReducer, userUpdateReducer } from './reducers/userAuthReducer';
import { userProfileReducer } from './reducers/userProfileReducer';
import { orderCreateReducer } from './reducers/orderReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userAuthReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const intitialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  user: { userInfo: userInfoFromStorage },
};

const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware);

const store = createStore(reducer, intitialState, middleware);

export default store;
