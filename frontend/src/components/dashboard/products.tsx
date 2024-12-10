import { List, Pagination, Tooltip } from "antd";
import { Copy, Edit, Trash } from "lucide-react";
import { createElement, Dispatch, FC, SetStateAction, useState } from "react";
import { IProduct } from "../../interfaces/api.products.res.type";
import { Link } from "react-router-dom";
import { IProductMeta } from "../../interfaces/api.response.type";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { decrypt } from "../../utils/text_encryption";
import UserRole from "../../constants/user_role";
import DuplicateProduct from "./vendors/duplicate_product";
import { useDeleteProductMutation } from "../../redux/features/products/products.api";
import { toast } from "sonner";

interface IProductsProps {
  products: IProduct[];
  meta: IProductMeta;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

interface IIconTextProps {
  icon: React.FC;
  text: string;
  item: IProduct | string;
}
const Products: FC<IProductsProps> = ({ products, meta, setCurrentPage }) => {
  const user = useAppSelector(useCurrentUser);
  const [deleteProduct] = useDeleteProductMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | null>(null);
  const [actionType, setActionType] = useState<"edit" | "duplicate">(
    "duplicate"
  );

  async function handleDuplicateProduct(item: IProduct) {
    setActionType("duplicate");
    setIsDrawerOpen(true);
    setSelectedItem(item);
  }

  async function handleEditProduct(item: IProduct) {
    setActionType("edit");
    setIsDrawerOpen(true);
    setSelectedItem(item);
  }

  async function handleDeleteProduct(id: string) {
    const toastId = toast.loading("Loading...");
    const res = await deleteProduct({ id });

    if (res.data.success) {
      toast.success("Product Deleted", { id: toastId });
    } else {
      toast.success("Something bad happened!", { id: toastId });
    }
  }

  const IconText = ({ icon, text, item }: IIconTextProps) => (
    <div
      onClick={() =>
        text === "Copy"
          ? handleDuplicateProduct(item as IProduct)
          : text === "Edit"
          ? handleEditProduct(item as IProduct)
          : handleDeleteProduct(item as string)
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
                    <IconText icon={Copy} text="Copy" item={item} key="copy" />,
                    <IconText icon={Edit} text="Edit" item={item} key="edit" />,
                    <IconText
                      icon={Trash}
                      text="Delete"
                      item={item.id}
                      key="delete"
                    />,
                  ]
                : [
                    <IconText icon={Edit} text="Edit" item={item} key="edit" />,
                    <IconText
                      icon={Trash}
                      text="Delete"
                      item={item.id}
                      key="delete"
                    />,
                  ]
            }
            extra={<img width={172} alt={item.title} src={item.imgs[0]} />}
          >
            <List.Item.Meta
              title={
                <Link to={`/products/item/${item.id}`} target="_blank">
                  {item.title}
                </Link>
              }
            />
            {item.description.slice(0, 400)} ...
          </List.Item>
        )}
      />
      <Pagination
        align="end"
        pageSize={5}
        current={meta.page}
        onChange={(val) => setCurrentPage(val)}
        showSizeChanger={false}
        total={meta.total}
      />
      {selectedItem && (
        <DuplicateProduct
          actionType={actionType}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          product={selectedItem}
        />
      )}
    </>
  );
};

export default Products;
