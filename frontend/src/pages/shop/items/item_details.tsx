import { Link, useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "../../../redux/features/products/products.api";
import ProductImages from "./components/product_images";
import { IProduct } from "../../../interfaces/api.products.res.type";
import Loading from "../../../components/loading";
import ProductDetails from "./components/product_details";
import ShopInfo from "./components/shop_info";
import AddToCart from "./components/add_to_cart";
import RelatedProducts from "./components/related_products";
import CustomerReview from "./components/customer_review";
import { Button, Result } from "antd";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleProductQuery({
    id: id as string,
  });
  const product: IProduct = data?.data;
  const { data: relatedProducts, isLoading: relatedLoading } =
    useGetAllProductsQuery(
      {
        categoryId: product?.categoryId,
        limit: 4,
      },
      { skip: !product?.categoryId }
    );

  if (isLoading || relatedLoading) {
    return <Loading />;
  }

  if (isError)
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the product you visited does not exist."
        extra={
          <Link to={"/"}>
            <Button color="danger" variant="solid">
              Back Home
            </Button>
          </Link>
        }
      />
    );

  const filteredRelatedProducts = relatedProducts?.data?.filter(
    (product: IProduct) => product.id !== id
  );

  console.log(filteredRelatedProducts);

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
      {filteredRelatedProducts.length > 0 && (
        <RelatedProducts products={filteredRelatedProducts} />
      )}
      <CustomerReview reviews={product.review} rating={product.avgRating} />
    </div>
  );
}
