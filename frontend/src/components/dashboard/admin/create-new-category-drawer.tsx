import { Button, Col, Drawer, Input, Row, Space } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ICreateNewCategoryDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateNewCategoryDrawer: FC<ICreateNewCategoryDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const { control, handleSubmit } = useForm();

  async function handleCreateNewCategory(data: any) {
    if (!data.name) {
      toast.info("Category name cannot empty!");
      return;
    }
  }

  return (
    <Drawer
      title="Create a new category"
      width={400}
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit(handleCreateNewCategory)}
          >
            Create
          </Button>
        </Space>
      }
    >
      <form onSubmit={handleSubmit(handleCreateNewCategory)}>
        <Row gutter={16}>
          <Col span={24}>
            <label
              htmlFor="product"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category Name
              <span className="text-red-600"> *</span>
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  maxLength={25}
                  required
                  placeholder="eg. Arts & Beauty"
                  showCount
                  size="large"
                />
              )}
            />
          </Col>
        </Row>
      </form>
    </Drawer>
  );
};

export default CreateNewCategoryDrawer;
