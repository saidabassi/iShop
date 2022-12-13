import React from "react";
import { useAppContext } from "../../JS/appContext.js";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert, FormRowSelect } from "../../components";
const AddProduct = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    status,
    statusOptions,
    name,
    description,
    price,
    // ProductImage,
    isEditing,
    quantity,
    handleChange,
    clearValues,
    location,
    createProduct,
    editProduct
    
  } = useAppContext();

  const handleProduct = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!name || !price || !description || !status || quantity ) {
    //   displayAlert();
    // }
    if (isEditing) {
      editProduct()
      return;
    }
    createProduct()
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit product" : "add product"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* product name */}
          <FormRow
            type="text"
            labelText="name"
            name="name"
            value={name}
            handleChange={handleProduct}
          />
          {/* description */}
          <FormRow
            type="text"
            labelText="description"
            name="description"
            value={description}
            handleChange={handleProduct}
          />
          {/* price */}
          <FormRow
            type="number"
            labelText="price"
            name="price"
            value={price}
            handleChange={handleProduct}
          />

          {/* quantity */}
          <FormRow
            type="number"
            name="quantity"
            labelText="quantity"
            value={quantity}
            handleChange={handleProduct}
          />
          {/*status*/}
          <FormRowSelect
            name="status"
            labelText="status"
            value={status}
            handleChange={handleProduct}
            list={statusOptions}
          />
          <FormRow
            type="text"
            name="location"
            labelText="location"
            value={location}
            handleChange={handleProduct}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddProduct;
