import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productListReducer';
import { productDetailsReducer } from './reducers/productDetailsReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const intitialState = {
  cart: { cartItems: cartItemsFromStorage },
};

// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware);

const store = createStore(reducer, intitialState, middleware);

export default store;
