import { useState, useMemo } from "react";
import { Layout, Input, Select, Slider, Typography, Button } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { useGetAllProductsQuery } from "../../redux/features/products/products.api";
import { IProduct } from "../../interfaces/api.products.res.type";
import ProductCard from "../../components/products/product_card";
import { useLocation } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/features/categories/categories.api";

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

export default function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParams = searchParams.get("category");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams ? categoryParams : ""
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100 * 50]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const { data: categories } = useGetCategoriesQuery(undefined);

  // Generate query parameters for filtering products
  const queryParams = useMemo(() => {
    const query = {
      searchTerm,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortOrder,
    } as {
      searchTerm: string;
      minPrice: number;
      maxPrice: number;
      sortOrder: "desc" | "asc";
      categoryId?: string | null;
    };

    if (selectedCategory) {
      query.categoryId = selectedCategory;
    }

    return query;
  }, [searchTerm, selectedCategory, priceRange, sortOrder]);

  const { data: products } = useGetAllProductsQuery(queryParams);

  const categoriesOptions = categories
    ? categories.map((item: Record<string, unknown>) => ({
        value: item.id,
        label: item.name,
      }))
    : [];

  categoriesOptions.unshift({ value: "", label: "All Categories" });

  const FilterOptions = () => (
    <>
      <div className="mb-4">
        <Text strong>Category</Text>
        <Select
          style={{ width: "100%" }}
          options={categoriesOptions}
          placeholder="Select a category"
          onChange={(value) => setSelectedCategory(value)}
          value={selectedCategory}
        ></Select>
      </div>
      <div className="mb-4">
        <Text strong>Price Range</Text>
        <Slider
          range
          min={0}
          max={100 * 50}
          value={priceRange}
          onChange={(value) => setPriceRange(value as [number, number])}
        />
      </div>
      <div>
        <Text strong>Sort by Price</Text>
        <Select
          style={{ width: "100%" }}
          value={sortOrder}
          onChange={(value) => setSortOrder(value)}
        >
          <Option value="asc">Low to High</Option>
          <Option value="desc">High to Low</Option>
        </Select>
      </div>
    </>
  );

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white lg:hidden p-0 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className="lg:hidden"
          />
        </div>
      </Header>
      <Layout>
        <Sider
          width={300}
          className={`bg-white p-4 overflow-auto transition-all duration-300 ease-in-out ${
            sidebarVisible ? "left-0" : "-left-full"
          } lg:left-0 fixed lg:relative h-[calc(100vh-64px)] z-10`}
        >
          <div className="mb-4">
            <Text strong>Search</Text>
            <Input
              placeholder="Search products"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FilterOptions />
        </Sider>
        <Content className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.data.map((product: IProduct) => (
              <ProductCard {...product} key={product.id} />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
