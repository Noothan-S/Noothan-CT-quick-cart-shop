import React, { useState } from "react";
import { Card, Button, Result, Empty, Typography, FloatButton } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categories.api";
import Loading from "../../../components/loading";
import { Plus } from "lucide-react";
import CreateNewCategoryDrawer from "../../../components/dashboard/admin/create-new-category-drawer";

interface GridItem {
  id: string;
  name: string;
}

const Categories: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery({});
  const [isCreateNewCategoryDrawerOpen, setIsCreateNewCategoryDrawerOpen] =
    useState<boolean>(false);

  const gridStyle: React.CSSProperties = {
    width: "25%",
    textAlign: "center",
    position: "relative",
    padding: "24px 12px",
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Result status={"500"} />;

  if (categories.length < 1) {
    return (
      <Empty
        className="flex flex-col items-center"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        description={
          <Typography.Text>No Available Categories found</Typography.Text>
        }
      >
        <Button
          type="primary"
          onClick={() => setIsCreateNewCategoryDrawerOpen(true)}
        >
          Create One
        </Button>
      </Empty>
    );
  }

  return (
    <>
      <Card title="Categories">
        {categories.map((item: GridItem) => (
          <Card.Grid key={item.id} style={gridStyle}>
            {item.name}
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
              }}
              onClick={() => handleDelete(item.id)}
              aria-label="Delete"
            />
          </Card.Grid>
        ))}
      </Card>
      <FloatButton
        onClick={() => setIsCreateNewCategoryDrawerOpen(true)}
        icon={<Plus />}
        tooltip={<div>Create new category</div>}
      />
      <CreateNewCategoryDrawer
        isDrawerOpen={isCreateNewCategoryDrawerOpen}
        setIsDrawerOpen={setIsCreateNewCategoryDrawerOpen}
      />
    </>
  );
};

export default Categories;
