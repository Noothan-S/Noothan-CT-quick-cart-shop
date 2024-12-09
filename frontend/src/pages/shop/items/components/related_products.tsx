import ProductCard from "../../../../components/products/product_card";
import { IProduct } from "../../../../interfaces/api.products.res.type";

const RelatedProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: IProduct) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
