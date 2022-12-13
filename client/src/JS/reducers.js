import {
  CLEAR_ALERT,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCESS,
  DISPLAY_ALERT,
  TOGGLE_SIDEBAR,
  UPDATE_USER,
  UPDATE_USER_SUCESS,
  UPDATE_USER_FAIL,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCES,
  CREATE_PRODUCT_FAIL,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  SET_EDIT_PRODUCT,
} from "./actionTypes";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: false, alertType: "", alertText: "" };
  }
  if (action.type === REGISTER_USER) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      location: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User created! Redirecting",
    };
  }
  if (action.type === REGISTER_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      location: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Logged in! Redirecting",
    };
  }
  if (action.type === LOGIN_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText:"cannot log user",
    };
  }
  if (action.type === UPDATE_USER) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      location: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "Update User succes! ",
    };
  }
  if (action.type === UPDATE_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGOUT_USER) {
    return { ...initialState, user: null, token: null, location: "" };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CREATE_PRODUCT) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_PRODUCT_SUCCES) {
    return {
      ...state,
      isLoading:false,
      showAlert: true,
      alertType: "success",
      alertText: "Product Created Successfully!",
    };
  }
  if (CREATE_PRODUCT_FAIL) {
    return{
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: 'cannot add product'
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editProductId: "",
      name: "",
      descricption: "",
      price: "",
      quantity: "",
      imageUrl: "",
      status: "pending",
    };
    return { ...state, ...initialState };
  }
  if (action.type === GET_PRODUCTS) { 
    return {
      ...state,
      isLoading: true,
      showAlert:false
    }
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading:false,
      products: action.payload.products,
      totalProducts: action.payload.totalProducts,
      numOfPages: action.payload.numOfPages
    }
  }
  if (action.type === SET_EDIT_PRODUCT) {
    const product = state.products.find((product) => product._id === action.payload.id);
    const { _id, name, descricption, price, quantity, status } = product;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      name,
      descricption,
      price,
      quantity,
      status,
    };
  }
  throw new Error(`no such action : ${action.type}`);
};
export default reducer;
