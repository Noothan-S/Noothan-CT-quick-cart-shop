import { FC } from "react";
import Logo from "../../../constants/logo";
import { Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LocateIcon, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { IUpdateUserProps } from "../../../interfaces/update.user.props.type";
import { updateVendorValidationSchema } from "../../../validations/update_vendor_validation";
import TextArea from "antd/es/input/TextArea";
import { useUpdateUserMutation } from "../../../redux/features/auth/auth.api";
import { toast } from "sonner";

type updateVendorFormInputs = z.infer<typeof updateVendorValidationSchema>;

const UpdateUser: FC<IUpdateUserProps> = ({ metadata }) => {
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updateVendorFormInputs>({
    resolver: zodResolver(updateVendorValidationSchema),
  });

  const onSubmit = async (vendorData: updateVendorFormInputs) => {
    const additionalPayload = { ...vendorData, email: metadata.email };
    const res = await updateUser(additionalPayload);

    if (res?.data?.success) {
      toast.success("Account registered. Please login your account");
      navigate("/auth/login");
      metadata.setIsPassed(false);
    }
  };

  return (
    <section className="bg-gray-50 w-full">
      <div className="flex w-full flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full !mt-5 bg-white rounded-lg shadow md:mt-0 sm:max-w-screen-sm xl:tp-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Update your Vendor
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* first name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vendor Name
                    <span className="text-red-600"> *</span>
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        type="text"
                        placeholder="eg. Sheikh Hub"
                        prefix={<UserOutlined />}
                      />
                    )}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* phn */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contact number
                    <span className="text-red-600"> *</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        type="text"
                        placeholder="+8801712345678"
                        prefix={<Phone size={16} />}
                      />
                    )}
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Address
                    <span className="text-red-600"> *</span>
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        type="text"
                        placeholder="Rangpur, Bangladesh"
                        prefix={<LocateIcon size={16} />}
                      />
                    )}
                  />

                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                {/* des */}
                <div className="md:col-span-2">
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
                        rows={7}
                        placeholder="maxLength is 200"
                        maxLength={200}
                      />
                    )}
                  />

                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                htmlType="submit"
                className="w-full"
                size="large"
                variant="solid"
                color="danger"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
