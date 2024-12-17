import React from "react";
import { Card, Col, Typography, Rate, Tag, Result, Button } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import {
  ICompare,
  selectCompare,
} from "../../redux/features/compare/compare.slice";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { useGetComparisonProductsQuery } from "../../redux/features/products/products.api";
import Loading from "../../components/loading";
import { IProduct } from "../../interfaces/api.products.res.type";
import { formatPrice } from "../../utils/format-price";

const { Title, Text } = Typography;

const ProductComparison: React.FC = () => {
  const compare: ICompare[] = useAppSelector((state: RootState) =>
    selectCompare(state)
  );
  const preparedSelectedIds: string[] = [];
  for (const item of compare) {
    preparedSelectedIds.push(item.productId);
  }

  const {
    data: products,
    isLoading,
    isError,
  } = useGetComparisonProductsQuery(
    { ids: preparedSelectedIds },
    { skip: !compare.length }
  );

  if (!compare.length) {
    return (
      <div className="flex justify-center items-center h-screen -mt-16">
        <Result
          title="No Products found in your comparison list"
          extra={
            <Link to="/products">
              <Button danger key="console">
                Select Product(s)
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link to="/">
            <Button danger>Back Home</Button>
          </Link>
        }
      />
    );
  }
  return (
    <div className="container px-4 py-12 mx-auto">
      <Title level={2} className="mb-8 text-center">
        Product Comparison
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products?.data?.map((product: IProduct) => (
          <Link to={`/products/item/${product.id}`} target="_blank">
            <Col key={product.id} className="mb-4">
              <Card
                hoverable
                cover={
                  <div className="h-64 w-full bg-gray-100">
                    <img
                      className="object-cover h-64 w-full"
                      src={product.imgs[0]}
                      alt={product.title}
                    />
                  </div>
                }
                className="h-full  flex flex-col"
              >
                <Card.Meta
                  title={<Title level={4}>{product.title}</Title>}
                  description={
                    <div className="flex flex-col h-full">
                      <Text strong className="mb-2">
                        {formatPrice(product.price - product.discount)}
                      </Text>
                      <Tag color="blue" className="mb-2">
                        <ShoppingOutlined className="mr-1" />
                        {product.category.name}
                      </Tag>
                      <Rate
                        disabled
                        defaultValue={product.avgRating}
                        className="mb-2"
                      />
                      <Text className="mb-2">
                        {product.description.slice(0, 200)}...
                      </Text>
                    </div>
                  }
                />
              </Card>
            </Col>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductComparison;
