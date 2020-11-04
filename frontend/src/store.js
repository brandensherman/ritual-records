import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productListReducer';
import { productDetailsReducer } from './reducers/productDetailsReducer';
import { cartReducer } from './reducers/cartReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const intitialState = {
  cart: { cartItems: cartItemsFromStorage },
  user: { userInfo: userInfoFromStorage },
};

// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware);

const store = createStore(reducer, intitialState, middleware);

export default store;
