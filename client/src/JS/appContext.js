import { useReducer, useContext, createContext, useEffect } from "react";
import reducer from "./reducers";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER,
  REGISTER_USER_SUCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_SUCESS,
  LOGIN_USER_FAIL,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
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
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  location: userLocation || "",
  token: token,
  showSidebar: false,
  name: "",
  description: "",
  price: "",
  quantity: "",
  imageUrl: "",
  isEditing: false,
  editProductID: "",
  statusOptions: ["pending", "accepted", "declined"],
  status: "pending",
  products: [],
  totalProducts: "",
  page: 1,
  numOfPages: 1,
};
//global state
const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios GLOBAL do not use, not secure (token accessible with other requests)
  // axios.defaults.headers["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: `/api/products`,
  });
  //axios interceptors to make authorization req & res global
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // res
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );
  //dispatch alert
  const displaytAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const logout = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStrorage();
  };
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserFromLocalStrorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER });
    try {
      const response = await axios.post("api/user/register", currentUser);
      // console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER });
    try {
      const { data } = await axios.post("api/user/login", currentUser);
      // console.log(response);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER });
    try {
      const { data } = await authFetch.patch("/user/updateUser", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
    clearAlert();
  };
  const createProduct = async () => {
    dispatch({ type: CREATE_PRODUCT });
    try {
      const { name, description, price, quantity } = state;

      await authFetch.post("/addProduct", {
        name,
        description,
        price,
        quantity,
      });
      dispatch({
        type: CREATE_PRODUCT_SUCCES,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getProducts = async () => {
    let url = "/allProducts";
    dispatch({ type: GET_PRODUCTS });
    try {
      const { data } = await authFetch(url);
      const { products, totalProducts, numOfPages } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: { products, totalProducts, numOfPages },
      });
    } catch (error) {
      console.log(error.response);
      logout();
    }

    clearAlert();
  };
   
  const setEditProduct = (id) => {
    dispatch({ type: SET_EDIT_PRODUCT, payload: { id } })
  }
  const deleteProduct = (id) =>{
    console.log(`delete : ${id}`)
  }
  // const getProducts = () => async (dispatch) => {
  //   dispatch ({type : GET_PRODUCTS})
  //   try {
  //       let result = await authFetch.get('/allproducts')
  //       dispatch (  { type : GET_PRODUCTS_SUCCESS, payload : result.data.listProducts})
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  //  const createProduct = (newProduct) => async (dispatch) => {
  //   dispatch ({type : CREATE_PRODUCT})
  //   try {
  //       let result = await authFetch.post('/addProduct',newProduct)
  //       dispatch (  { type : CREATE_PRODUCT_SUCCES, payload : result.data})
  //   } catch (error) {
  //       dispatch ({type : CREATE_PRODUCT_FAIL , payload : error.response.data.errors})
  //   }
  // }
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logout,
        updateUser,
        handleChange,
        clearValues,
        displaytAlert,
        createProduct,
        getProducts,
        setEditProduct,
        deleteProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
