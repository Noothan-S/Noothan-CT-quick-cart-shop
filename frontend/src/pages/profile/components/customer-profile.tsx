import { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  Avatar,
  Typography,
  Descriptions,
  Badge,
  Button,
  Form,
  Input,
} from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Camera } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileMutation } from "../../../redux/features/user/user.api";
import { toast } from "sonner";
import uploadImageToImgBb from "../../../utils/upload_image";
import { ICustomerProfile } from "../../../interfaces/api.customer.profile.type";
import { updateProfileFormProfileValidationSchema } from "../../../validations/update_Profile_validation";

const { Title, Text } = Typography;

type IEditVendorFormInputs = z.infer<
  typeof updateProfileFormProfileValidationSchema
>;

export default function CustomerProfile({
  customer,
}: {
  customer: ICustomerProfile;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    customer.img
  );
  const [updateCustomer] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditVendorFormInputs>({
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      address: customer.address,
    },
    resolver: zodResolver(updateProfileFormProfileValidationSchema),
  });

  async function handleChangeProfilePicture(
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files && event.target.files[0]) {
      const loading = toast.loading("Updating profile picture...");
      const imgBbResponse = await uploadImageToImgBb(
        Array.from(event.target.files)
      );

      if (imgBbResponse.error) {
        toast.error("Something bad happened with updating profile Picture", {
          id: loading,
        });
        console.log("Error when updating profile picture", imgBbResponse.error);
      }

      if (imgBbResponse.urls?.length) {
        setProfilePicture(imgBbResponse.urls[0]);
        toast.success(
          "Profile picture successfully updated. Click save button",
          { id: loading }
        );
      }
    }
  }

  const onSubmit = async (data: IEditVendorFormInputs) => {
    try {
      const res = await updateCustomer({
        ...data,
        img: profilePicture,
        email: customer.email,
      }).unwrap();
      if (res.success) {
        toast.success("Vendor Profile successfully updated");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Something bad happened");
      setIsEditing(false);
      console.log("Error when updating vendor profile", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card
        extra={
          <Button
            icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
            onClick={() =>
              isEditing ? handleSubmit(onSubmit)() : setIsEditing(true)
            }
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        }
      >
        <div className="flex items-center mb-4 relative">
          <Avatar size={64} src={customer.img}>
            {customer?.firstName?.charAt(0)}
          </Avatar>
          {isEditing && (
            <label
              className="absolute inset-0 w-16 h-16 top-1.5 flex items-center justify-center bg-black bg-opacity-20 opacity-100 transition-opacity duration-300 cursor-pointer rounded-full"
              htmlFor="profile-picture"
            >
              <Camera className="text-white" size={20} />
            </label>
          )}
          <input
            accept="image/*"
            className="hidden"
            id="profile-picture"
            type="file"
            onChange={handleChangeProfilePicture}
          />
          <div className="ml-4">
            <Title level={2}>
              {customer.firstName} {customer.lastName}
            </Title>
            <Text type="secondary">{customer.email}</Text>
          </div>
        </div>

        <Form layout="vertical">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="First Name">
              {isEditing ? (
                <>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="eg. Mohammad"
                        size="large"
                        {...field}
                      />
                    )}
                  />

                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </>
              ) : (
                customer.firstName
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Last Name">
              {isEditing ? (
                <>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="eg. Nazmul" size="large" {...field} />
                    )}
                  />

                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </>
              ) : (
                customer.lastName
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {isEditing ? (
                <>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="eg. Rangpur, Bangladesh"
                        size="large"
                        {...field}
                      />
                    )}
                  />

                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </>
              ) : (
                customer.address
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {isEditing ? (
                <>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="eg. +8801712345678"
                        size="large"
                        {...field}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}{" "}
                    </p>
                  )}
                </>
              ) : (
                customer.phone
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(customer.createdAt).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              {new Date(customer.updatedAt).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={customer.isDeleted ? "error" : "success"}
                text={customer.isDeleted ? "Blacklisted" : "Active"}
              />
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Card>
    </div>
  );
}
