import React, { FC, useState } from "react";
import Logo from "../../../constants/logo";
import { Button, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserValidationSchema } from "../../../validations/user_create_validation";
import { userCreationOptions } from "../../../constants/user.create.role";
import { useCreateUserMutation } from "../../../redux/features/auth/auth.api";

interface ICreateUserProps {
  setIsPassed: React.Dispatch<
    React.SetStateAction<
      | {
          email: string;
          role: "CUSTOMER" | "VENDOR";
        }
      | false
    >
  >;
}

type createUserFormInputs = z.infer<typeof createUserValidationSchema>;
const CreateUser: FC<ICreateUserProps> = ({ setIsPassed }) => {
  const [createUser] = useCreateUserMutation();

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showPass2, setShowPass2] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormInputs>({
    resolver: zodResolver(createUserValidationSchema),
  });

  const onSubmit = async (credential: createUserFormInputs) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...actualCredential } = credential;

    const res = await createUser(actualCredential);

    if (res?.data?.success) {
      setIsPassed({
        email: res.data.data.email,
        role: credential?.role,
      });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full !mt-5 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:tp-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create new account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Join as
                </label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-full"
                      size="large"
                      //   defaultValue="CUSTOMER"
                      placeholder="Customer"
                      options={userCreationOptions}
                    />
                  )}
                />

                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      type="email"
                      placeholder="sheikh@example.com"
                      prefix={<UserOutlined />}
                    />
                  )}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      type={showPass ? "text" : "password"}
                      placeholder="········"
                      prefix={<Lock size={16} />}
                      suffix={
                        <div
                          className="cursor-pointer"
                          onClick={() => setShowPass(!showPass)}
                        >
                          {showPass ? <EyeClosed /> : <Eye />}
                        </div>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      type={showPass2 ? "text" : "password"}
                      placeholder="········"
                      prefix={<Lock size={16} />}
                      suffix={
                        <div
                          className="cursor-pointer"
                          onClick={() => setShowPass2(!showPass2)}
                        >
                          {showPass2 ? <EyeClosed /> : <Eye />}
                        </div>
                      }
                    />
                  )}
                />

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button
                htmlType="submit"
                className="w-full"
                size="large"
                variant="solid"
                color="danger"
              >
                Next
              </Button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateUser;
