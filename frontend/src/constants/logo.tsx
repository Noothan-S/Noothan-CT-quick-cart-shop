import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC<{ cls?: string }> = ({ cls }) => {
  return (
    <div>
      <Link to="/" className={`text-2xl font-bold ${cls}`}>
        Quick<span className="text-red-500">Cart</span>
      </Link>
    </div>
  );
};

export default Logo;
