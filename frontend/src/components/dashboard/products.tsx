import { List, Pagination, Tooltip } from "antd";
import { Copy, Edit, Trash } from "lucide-react";
import { createElement, Dispatch, FC, SetStateAction } from "react";
import { IProduct } from "../../interfaces/api.products.res.type";
import { Link } from "react-router-dom";
import { IProductMeta } from "../../interfaces/api.response.type";

interface IProductsProps {
  products: IProduct[];
  meta: IProductMeta;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Products: FC<IProductsProps> = ({ products, meta, setCurrentPage }) => {
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Tooltip className="cursor-pointer" title={text}>
      {createElement(icon)}
    </Tooltip>
  );

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={products}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={Copy} text="Copy" key="copy" />,
              <IconText icon={Edit} text="Edit" key="edit" />,
              <IconText icon={Trash} text="Delete" key="delete" />,
            ]}
            extra={<img width={172} alt={item.title} src={item.imgs[0]} />}
          >
            <List.Item.Meta title={<Link to={"/"}>{item.title}</Link>} />
            {item.description.slice(0, 400)} ...
          </List.Item>
        )}
      />
      <Pagination
        align="end"
        pageSize={5}
        onChange={(val) => setCurrentPage(val)}
        showSizeChanger={false}
        total={meta.totalPages}
      />
    </>
  );
};

export default Products;
