import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../../redux/features/products/products.api";
import ProductImages from "./components/product_images";
import { IProduct } from "../../../interfaces/api.products.res.type";
import Loading from "../../../components/loading";
import ProductDetails from "./components/product_details";
import ShopInfo from "./components/shop_info";
import AddToCart from "./components/add_to_cart";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleProductQuery({ id: id as string });
  const product: IProduct = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ProductImages images={product?.imgs} />
        <div>
          <ProductDetails {...product} />
          <ShopInfo {...product.vendor} />
          <AddToCart {...product} />
        </div>
      </div>
      {/* <RelatedProducts products={relatedProducts} /> */}
      {/* <CustomerReviews reviews={product.reviews} rating={product.rating} /> */}
    </div>
  );
}
