import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SingleEmployee from "./SingleEmployee";
import MainLayout from "../layouts/MainLayout";
const Routers = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {[Home, SingleEmployee].map((item) => {
            return (
              <Route key={item.path} path={item.path} element={item.page} />
            );
          })}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default Routers;
