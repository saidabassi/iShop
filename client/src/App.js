import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, LandingPage, Error, ProtectedRoute } from "./Pages/index";
import AllProducts from "./Pages/dashboard/allProducts";
import AddProduct from "./Pages/dashboard/addProduct";
import Profile from "./Pages/dashboard/Profile";
import SharedLayout from "./Pages/dashboard/sharedLayout";
import Stats from "./Pages/dashboard/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="allProducts" element={<AllProducts />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
