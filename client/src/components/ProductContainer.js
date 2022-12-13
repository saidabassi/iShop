import { useAppContext } from "../JS/appContext";
import Loading from "./Loading";
import Product from "./Product";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useEffect } from "react";

const ProductContainer = () => {
  const  {getProducts, products, isLoading, page, totalProducts} = useAppContext();
    
  useEffect(() => {
    getProducts(); 
   }, []);
  if (isLoading) {
    return <Loading center />;
  } 
  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No products to display...</h2>
      </Wrapper> 
      
    );
  }
  
  return (
    <Wrapper>
      <h5>
        {totalProducts} Product{products.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ProductContainer;
