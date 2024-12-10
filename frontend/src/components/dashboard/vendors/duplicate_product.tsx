import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Col, Drawer, Input, Row, Select, Space } from "antd";
import { IProduct } from "../../../interfaces/api.products.res.type";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categories.api";
import { createProductValidationSchema } from "../../../validations/product.create.validation";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InboxOutlined } from "@ant-design/icons";
import {
  Baseline,
  BrickWall,
  DollarSign,
  Paperclip,
  Percent,
  Trash,
} from "lucide-react";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";

interface IDuplicateProductProps {
  product: IProduct;
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
type duplicateOrEditFormInputs = z.infer<typeof createProductValidationSchema>;

const DuplicateProduct: React.FC<IDuplicateProductProps> = ({
  product,
  setIsDrawerOpen,
  isDrawerOpen,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState<IProduct>(product);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<duplicateOrEditFormInputs>({
    resolver: zodResolver(createProductValidationSchema),
    defaultValues: {
      title: updatedProduct.title || "",
      price: updatedProduct.price || 0,
      discount: updatedProduct.discount || 0,
      quantity: updatedProduct.quantity || 0,
      categoryId: updatedProduct.categoryId || undefined,
      description: updatedProduct.description || "",
    },
  });

  const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

  const categoriesOptions = categories?.map(
    (item: Record<string, unknown>) => ({
      value: item.id,
      label: item.name,
    })
  );
  const [images, setImages] = useState<File[]>([]);
  const [oldImages, setOldImages] = useState<string[] | undefined>(
    updatedProduct?.imgs
  );

  const handleUploadChange = (info: any) => {
    const fileList = info.fileList
      .map((file: any) => file.originFileObj)
      .filter(Boolean);
    setImages(fileList);
  };

  const props = {
    name: "file",
    multiple: true,
    onChange: handleUploadChange,
    onDrop(e: React.DragEvent<HTMLDivElement>) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setImages((prev) => [...prev, ...droppedFiles]);
    },
  };

  function handleRemoveOldImg(url: string) {
    setOldImages((prev) => prev?.filter((link) => link !== url));
  }

  async function handleEditOrDuplicateProduct(data: duplicateOrEditFormInputs) {
    console.log(data);
  }

  useEffect(() => {
    reset({
      title: product.title || "",
      price: product.price || 0,
      discount: product.discount || 0,
      quantity: product.quantity || 0,
      categoryId: product.categoryId || undefined,
      description: product.description || "",
    });
    setOldImages(product?.imgs);
  }, [product, reset, isDrawerOpen]);

  return (
    <>
      <Drawer
        title={`Duplicate ${updatedProduct?.title}`}
        width={720}
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
              onClick={handleSubmit(handleEditOrDuplicateProduct)}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <form>
          <Row gutter={16}>
            <Col span={24}>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
                <span className="text-red-600"> *</span>
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="eg. iPhone 14 pro max"
                    prefix={<Baseline size={16} />}
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </Col>
          </Row>

          <Row gutter={16} className="mt-3">
            <Col span={12}>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
                <span className="text-red-600"> *</span>
              </label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    size="large"
                    placeholder="eg. 200.43"
                    prefix={<DollarSign size={16} />}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                )}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </Col>

            <Col span={12}>
              <label
                htmlFor="discount"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Discount
                <span className="text-red-600"> *</span>
              </label>
              <Controller
                name="discount"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    size="large"
                    placeholder="eg. 4"
                    prefix={<Percent size={16} />}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                )}
              />
              {errors.discount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discount.message}
                </p>
              )}
            </Col>
          </Row>

          <Row gutter={16} className="mt-3">
            <Col span={12}>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Quantity
                <span className="text-red-600"> *</span>
              </label>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    size="large"
                    placeholder="eg. 200"
                    prefix={<BrickWall size={16} />}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                )}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </Col>

            <Col span={12}>
              <label
                htmlFor="categoryId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
                <span className="text-red-600"> *</span>
              </label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    className="w-full"
                    size="large"
                    placeholder="eg. Electronics"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    loading={isLoading}
                    options={categoriesOptions}
                  />
                )}
              />
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </Col>
          </Row>

          <Row gutter={16} className="mt-3">
            <Col span={24}>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
                <span className="text-red-600"> *</span>
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    showCount
                    maxLength={5000}
                    rows={10}
                    className="w-full"
                    placeholder="eg. This is brand new iPhone 14 pro max..."
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </Col>
          </Row>

          <Row className="mt-3" gutter={16}>
            <Col span={24}>
              <label
                htmlFor="img"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Images
                <span className="text-red-600"> *</span>
              </label>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag image to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Dragger>
              {oldImages?.map((url) => (
                <div className="flex justify-between mr-1 text-red-500">
                  <div className="flex items-center gap-2.5">
                    <Paperclip size={12} />
                    <p>{url.split("/").slice(4).join("/")}</p>
                  </div>
                  <Trash onClick={() => handleRemoveOldImg(url)} size={14} />
                </div>
              ))}
            </Col>
          </Row>
        </form>
      </Drawer>
    </>
  );
};

export default DuplicateProduct;
