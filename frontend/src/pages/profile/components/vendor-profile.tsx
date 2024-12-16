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
import { IVendorProfileData } from "../../../interfaces/api.res.vendor.profile.type";
import { z } from "zod";
import { updateVendorFromProfileValidationSchema } from "../../../validations/update_vendor_validation";
import TextArea from "antd/es/input/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileMutation } from "../../../redux/features/user/user.api";
import { toast } from "sonner";
import uploadImageToImgBb from "../../../utils/upload_image";

const { Title, Text } = Typography;

type IEditVendorFormInputs = z.infer<
  typeof updateVendorFromProfileValidationSchema
>;

export default function VendorProfile({
  vendor,
}: {
  vendor: IVendorProfileData;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    vendor.logo
  );
  const [updateVendor] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditVendorFormInputs>({
    defaultValues: {
      phone: vendor.phone,
      address: vendor.address,
      description: vendor.description,
      name: vendor.name,
    },
    resolver: zodResolver(updateVendorFromProfileValidationSchema),
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
      const res = await updateVendor({
        ...data,
        logo: profilePicture,
        email: vendor.email,
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
          <Avatar size={64} src={vendor.logo}>
            {vendor?.name?.charAt(0)}
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
            <Title level={2}>{vendor.name}</Title>
            <Text type="secondary">{vendor.email}</Text>
          </div>
        </div>

        <Form layout="vertical">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {isEditing ? (
                <>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="eg. Hurrreh Shop"
                        size="large"
                        {...field}
                      />
                    )}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </>
              ) : (
                vendor.name
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
                vendor.address
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
                vendor.phone
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {isEditing ? (
                <>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        rows={7}
                        placeholder="eg. Welcome to my vendor..."
                        maxLength={200}
                        showCount
                        {...field}
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}{" "}
                    </p>
                  )}
                </>
              ) : (
                vendor.description.slice(0, 50)
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(vendor.createdAt).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              {new Date(vendor.updatedAt).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={vendor.isBlackListed ? "error" : "success"}
                text={vendor.isBlackListed ? "Blacklisted" : "Active"}
              />
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Card>
    </div>
  );
}
