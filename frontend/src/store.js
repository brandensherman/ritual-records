import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
// import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer } from './reducers/productList';
import { productDetailsReducer } from './reducers/productDetails';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;
