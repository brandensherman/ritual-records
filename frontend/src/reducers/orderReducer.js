import axios from 'axios';

const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';

const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL';

const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST';
const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS';
const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL';
export const ORDER_PAY_RESET = 'ORDER_PAY_RESET';

export const createOrder = (order) => async (dispatch, getState) => {
  console.log('ORDER --->', order);
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/orders', order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderitems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};
