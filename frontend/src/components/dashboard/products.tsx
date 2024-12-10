import { List, Pagination, Tooltip } from "antd";
import { Copy, Edit, Trash } from "lucide-react";
import { createElement, Dispatch, FC, SetStateAction } from "react";
import { IProduct } from "../../interfaces/api.products.res.type";
import { Link } from "react-router-dom";
import { IProductMeta } from "../../interfaces/api.response.type";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";
import UserRole from "../../constants/user_role";

interface IProductsProps {
  products: IProduct[];
  meta: IProductMeta;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

async function handleDuplicateProduct(id: string) {
  console.log("dd");
}

async function handleEditProduct(id) {
  console.log("eit");
}

async function handleDeleteProduct(id) {
  console.log("delet");
}

interface IIconTextProps {
  icon: React.FC;
  text: string;
  id: string;
}
const Products: FC<IProductsProps> = ({ products, meta, setCurrentPage }) => {
  const user = useAppSelector(useCurrentUser);

  const IconText = ({ icon, text, id }: IIconTextProps) => (
    <div
      onClick={() =>
        text === "Copy"
          ? handleDuplicateProduct(id)
          : text === "Edit"
          ? handleEditProduct(id)
          : handleDeleteProduct(id)
      }
    >
      <Tooltip className="cursor-pointer" title={text}>
        {createElement(icon)}
      </Tooltip>
    </div>
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
            actions={
              decrypt(user?.role) === UserRole.vendor
                ? [
                    <IconText
                      icon={Copy}
                      text="Copy"
                      id={item.id}
                      key="copy"
                    />,
                    <IconText
                      icon={Edit}
                      text="Edit"
                      id={item.id}
                      key="edit"
                    />,
                    <IconText
                      icon={Trash}
                      text="Delete"
                      id={item.id}
                      key="delete"
                    />,
                  ]
                : [
                    <IconText
                      icon={Trash}
                      text="Delete"
                      id={item.id}
                      key="delete"
                    />,
                  ]
            }
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
