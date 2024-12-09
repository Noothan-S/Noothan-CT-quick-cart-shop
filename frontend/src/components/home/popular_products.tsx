import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/products/products.api";
import { IProduct } from "../../interfaces/api.products.res.type";
import ProductCard from "../products/product_card";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Portable Charger",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function PopularProducts() {
  const { data } = useGetAllProductsQuery({ limit: 15 });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.data?.data?.map((product: IProduct) => (
            <ProductCard {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
