import React from "react";
import { Table, Button, Tag, Empty, Result, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import { IVendors } from "../../../interfaces/api.res.vendors";
import {
  useBlockUserMutation,
  useGetAllVendorsQuery,
} from "../../../redux/features/user/user.api";
import { IsoToDate } from "../../../utils/iso_to_date";
import Loading from "../../../components/loading";
import { toast } from "sonner";

const Vendors: React.FC = () => {
  const {
    data: vendors,
    isLoading,
    isError,
  } = useGetAllVendorsQuery({ limit: 9000000000 });

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

  const columns: ColumnsType<IVendors> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
        <Tag color={record.isBlackListed ? "red" : "green"}>
          {record.isBlackListed ? "Blacklisted" : "Active"}
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
            record.isBlackListed ? "unblock" : "block"
          } this vendor?`}
          onConfirm={() => handleBlockUnblock(record.email)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            size="small"
            type={record.isBlackListed ? "primary" : "default"}
            danger={!record.isBlackListed}
          >
            {record.isBlackListed ? "Unblock" : "Block"}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (isLoading) return <Loading />;
  if (!vendors.data.length)
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if (isError) return <Result status={"500"} />;

  return <Table columns={columns} dataSource={vendors.data} rowKey="id" />;
};

export default Vendors;
