import React from "react";
import { Table, Button, Tag, Empty, Result } from "antd";
import { ColumnsType } from "antd/es/table";
import { IVendors } from "../../../interfaces/api.res.vendors";
import { useGetAllVendorsQuery } from "../../../redux/features/user/profile.api";
import { IsoToDate } from "../../../utils/iso_to_date";
import Loading from "../../../components/loading";

const Vendors: React.FC = () => {
  const {
    data: vendors,
    isLoading,
    isError,
  } = useGetAllVendorsQuery({ limit: 9000000000 });

  const handleBlockUnblock = (record: IVendors) => {
    console.log(record);
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
        <Button
          size="small"
          type={record.isBlackListed ? "primary" : "default"}
          danger={!record.isBlackListed}
          onClick={() => handleBlockUnblock(record)}
        >
          {record.isBlackListed ? "Unblock" : "Block"}
        </Button>
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
