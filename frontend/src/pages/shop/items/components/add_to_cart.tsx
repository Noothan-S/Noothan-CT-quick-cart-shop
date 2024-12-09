import { Button } from "antd";
import { ShoppingCart } from "lucide-react";

const AddToCart = ({ product }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <input
        type="number"
        min="1"
        className="w-16 px-2 py-1 border rounded-md"
      />
      <Button>
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
