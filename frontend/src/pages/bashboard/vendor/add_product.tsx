import { FC, useState } from "react";
import {
  useCreateNewProductMutation,
  useGetCategoriesQuery,
} from "../../../redux/features/products/products.api";
import { Button, Input, Select, message, Upload, UploadProps } from "antd";
import { createProductValidationSchema } from "../../../validations/product.create.validation";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import {
  Baseline,
  BrickWall,
  ChartBarStacked,
  DollarSign,
  Percent,
} from "lucide-react";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import Dragger from "antd/es/upload/Dragger";

type createUserFormInputs = z.infer<typeof createProductValidationSchema>;
const AddProduct: FC = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createNewProduct] = useCreateNewProductMutation();

  // State for uploaded images
  const [images, setImages] = useState<File[]>([]);

  console.log(images);

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
      console.log("Dropped files:", droppedFiles);
    },
  };

  const categoriesOptions = categories?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormInputs>({
    resolver: zodResolver(createProductValidationSchema),
  });

  async function handleCreateNewProduct(
    data: createUserFormInputs
  ): Promise<void> {
    // const res = await createNewProduct(data);

    console.log(data);
  }

  return (
    <section className="w-full">
      <div className="flex w-full flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Add New Product
        </h1>
        <div className="w-full !mt-5 bg-white rounded-lg shadow md:mt-0 sm:max-w-screen-md xl:tp-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              onSubmit={handleSubmit(handleCreateNewProduct)}
              className="space-y-4 md:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                {/* title */}
                <div className="md:col-span-2">
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
                      {errors.title.message}{" "}
                    </p>
                  )}
                </div>

                {/* price */}
                <div className="">
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
                      {errors.price.message}{" "}
                    </p>
                  )}
                </div>

                {/* discount */}
                <div className="">
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
                      {errors.discount.message}{" "}
                    </p>
                  )}
                </div>

                {/* quantity */}
                <div className="">
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
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    )}
                  />

                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.quantity.message}{" "}
                    </p>
                  )}
                </div>
                {/* category */}
                <div className="">
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
                        prefix={<ChartBarStacked size={16} />}
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
                      {errors.categoryId.message}{" "}
                    </p>
                  )}
                </div>
                {/* desorption */}
                <div className="col-span-2">
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
                        maxLength={500}
                        rows={10}
                        className="w-full"
                        placeholder="eg. This is brand new Iphone 14 pro max...."
                      />
                    )}
                  />

                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}{" "}
                    </p>
                  )}
                </div>
              </div>
              {/* img */}
              <div className="col-span-2">
                <label
                  htmlFor="img"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Images
                  <span className="text-red-600"> *</span>
                </label>
                <Dragger {...props} className="">
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
              </div>
              <Button
                htmlType="submit"
                className="w-full"
                size="large"
                variant="solid"
                color="danger"
              >
                Publish
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
