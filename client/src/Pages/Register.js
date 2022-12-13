import React, { useState, useEffect } from "react";
import { FormRow, Logo, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../JS/appContext";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isUser: true,
};
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displaytAlert, registerUser, loginUser } =
    useAppContext();
  // global state and useNavigate (to handleChange & submit)
  //toggle user
  const toggleUser = () => {
    setValues({ ...values, isUser: !values.isUser });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isUser } = values;
    if (!email || !password || (!isUser && !name)) {
      displaytAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isUser) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
    console.log(values);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>I-Shop</h3>
        <h3>{values.isUser ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {/* input name   */}
        {!values.isUser && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* input email   */}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* input password   */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isUser ? "Not a user yet?" : "Already a user?"}
          <button type="button" onClick={toggleUser} className="member-btn">
            {values.isUser ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
