import React from "react";
import { Table, Button, Tag, Empty, Result, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  useBlockUserMutation,
  useGetAllCustomersQuery,
} from "../../../redux/features/user/user.api";
import { IsoToDate } from "../../../utils/iso_to_date";
import Loading from "../../../components/loading";
import { toast } from "sonner";
import { IUserProfile } from "../../../interfaces/api.res.user.profile.type";

const Customers: React.FC = () => {
  const { data: customers, isLoading, isError } = useGetAllCustomersQuery({});

  console.log(customers);

  const [blockUnblockUser] = useBlockUserMutation();

  const handleBlockUnblock = async (email: string) => {
    try {
      const res = await blockUnblockUser({ email }).unwrap();
      if (res.success) {
        toast.success("Operation Success");
      }
    } catch (error) {
      toast.error("Something bad happened");
      console.log("Error when block/unblock user", error);
    }
  };

  const columns: ColumnsType<IUserProfile> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => IsoToDate(text),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.isDeleted ? "red" : "green"}>
          {record.isDeleted ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Critical Operation"
          description={`Are you sure to ${
            record.isDeleted ? "unblock" : "block"
          } this vendor?`}
          onConfirm={() => handleBlockUnblock(record.email)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            size="small"
            type={record.isDeleted ? "primary" : "default"}
            danger={!record.isDeleted}
          >
            {record.isDeleted ? "Unblock" : "Block"}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (isLoading) return <Loading />;
  if (!customers.data.length)
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if (isError) return <Result status={"500"} />;

  const profiles = customers.data
    .filter((item: any) => item.profile !== null)
    .map((customer: any) => customer.profile);

  return <Table columns={columns} dataSource={profiles} rowKey="id" />;
};

export default Customers;
