import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 mt-10">
      <p>xx</p>
    </div>
  );
};

export default ItemDetails;
