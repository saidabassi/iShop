import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import ProductInfo from "./productInfo";
import React from "react";
import moment from "moment";
import { useAppContext } from "../JS/appContext";
const Product = (
  name,
  descricption,
  price,
  quantity,
  status,
  createdAt,
  userLocation,
  _id
) => {
  const { setEditProduct, deleteProduct } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{descricption}</p>
          <h5>{price}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProductInfo icon={<FaLocationArrow />} text={userLocation} />
          <ProductInfo icon={<FaCalendarAlt />} text={date} />
          <productInfo icon={<FaBriefcase />} text={descricption} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/addProduct"
              onClick={() => setEditProduct(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteProduct(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Product;
