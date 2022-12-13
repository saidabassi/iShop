import React from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import notFound from "../assets/images/notFound.svg";
import {Link} from 'react-router-dom'
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
              <img src={notFound} alt="ERROR" />
              <h3>Ohh..Page not found!</h3>
              <p>We can't seem to find the page you are looking for</p>
              <Link to='/landing'>Back to Homepage</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
