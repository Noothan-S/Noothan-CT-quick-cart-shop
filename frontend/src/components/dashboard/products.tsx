import { List, Pagination } from "antd";
import { Space } from "lucide-react";
import { createElement } from "react";
import { IProduct } from "../../interfaces/api.products.res.type";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Products = ({ products }: { products: IProduct[] }) => {
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className="">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={products}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={<img width={172} alt="logo" src={item.imgs[0]} />}
          >
            <List.Item.Meta title={<Link to={"/"}>{item.title}</Link>} />
            {item.description.slice(0, 400)}
          </List.Item>
        )}
      />
      <Pagination align="end" total={30} />
    </div>
  );
};

export default Products;
