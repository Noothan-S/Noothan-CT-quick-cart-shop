import { useGetAllProductsQuery } from "../../redux/features/products/products.api";
import { IProduct } from "../../interfaces/api.products.res.type";
import ProductCard from "../products/product_card";

export default function PopularProducts() {
  const { data: products } = useGetAllProductsQuery({ limit: 12 });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.data?.map((product: IProduct) => (
            <ProductCard {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
