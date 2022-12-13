import Wrapper from "../../assets/wrappers/DashboardFormPage";
import React, { useState } from "react";
import { useAppContext } from "../../JS/appContext.js";
import { FormRow, Alert } from "../../components/index.js";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [userLocation, setuserLocation] = useState(user?.userLocation);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !userLocation) {
      displayAlert();
      return; 
    }
    updateUser({ name, email, lastName, userLocation });
  };  
  return (  
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3> 
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            labelText= 'location'
            name="userLocation"
            value={userLocation}
            handleChange={(e) => setuserLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait...':'save changes'}

          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
