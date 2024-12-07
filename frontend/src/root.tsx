import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

const Root: FC = () => {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;