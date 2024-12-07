import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

const Root: FC = () => {
  return (
    <div className="bg-gray-50">
      <nav>
        <Header />
      </nav>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;