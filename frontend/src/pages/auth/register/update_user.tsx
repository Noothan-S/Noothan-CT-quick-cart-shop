import { FC, useState } from "react";
import Logo from "../../../constants/logo";
import { Button, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/auth.slice";
import { encrypt } from "../../../utils/text_encryption";
import { createUserValidationSchema } from "../../../validations/user_create_validation";
import { userCreationOptions } from "../../../constants/user.create.role";

type createUserFormInputs = z.infer<typeof createUserValidationSchema>;

const UpdateUser: FC = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
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
    // const res = await loginUser(credential);

    console.log(credential);

    // if (res?.data?.success) {
    //   dispatch(
    //     setUser({
    //       token: encrypt(res.data?.data?.accessToken),
    //       user: {
    //         id: encrypt(res.data?.data?.user?.id),
    //         email: encrypt(res.data?.data?.user?.email),
    //         role: encrypt(res.data?.data?.user?.role),
    //       },
    //     })
    //   );
    // }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full !mt-5 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:tp-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
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
                      placeholder="Select account type"
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
                      placeholder="Enter your email"
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
                      placeholder="Enter your password"
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
                      placeholder="Enter your password"
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
                Sign in
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

export default UpdateUser;
