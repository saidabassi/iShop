import React from "react";
import {Logo} from "../components/index";
import mainShopping from "../assets/images/mainShopping.svg";
import Wrapper from "../assets/css/testing";
import {Link} from 'react-router-dom'
const LandingPage = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Best <span>Shopping</span> experience
          </h1>
          <p>Lorem ipsum bla bla bla</p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={mainShopping} alt="job hunt" className="img"></img>
      </div>
    </Wrapper>
  );
};

export default LandingPage;
