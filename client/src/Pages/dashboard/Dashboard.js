import React, { useEffect } from "react";
import axios from "axios"
const Dashboard = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      const data =  response
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <h1>Dashboard</h1>;
};

export default Dashboard;
