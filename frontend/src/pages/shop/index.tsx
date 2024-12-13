import { useState, useMemo } from "react";
import {
  Layout,
  Input,
  Select,
  Slider,
  Typography,
  Button,
  Result,
  Pagination,
} from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { useGetAllProductsQuery } from "../../redux/features/products/products.api";
import { IProduct } from "../../interfaces/api.products.res.type";
import ProductCard from "../../components/products/product_card";
import { useLocation } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/features/categories/categories.api";
import useDebounce from "../../hooks/debounce";
import Loading from "../../components/loading";

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

export default function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParams = searchParams.get("category");

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams ? categoryParams : ""
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100 * 50]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const { data: categories } = useGetCategoriesQuery(undefined);

  // Generate query parameters for filtering products
  const queryParams = useMemo(() => {
    const query = {
      searchTerm: debouncedSearch,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortOrder,
      page: currentPage,
      limit: 16,
    } as {
      searchTerm: any;
      minPrice: number;
      maxPrice: number;
      sortOrder: "desc" | "asc";
      categoryId?: string | null;
      page: number;
      limit: number;
    };

    if (selectedCategory) {
      query.categoryId = selectedCategory;
    }

    return query;
  }, [debouncedSearch, selectedCategory, priceRange, sortOrder, currentPage]);

  const { data: products, isLoading } = useGetAllProductsQuery(queryParams);

  const categoriesOptions = categories
    ? categories.map((item: Record<string, unknown>) => ({
        value: item.id,
        label: item.name,
      }))
    : [];

  categoriesOptions.unshift({ value: "", label: "All Categories" });

  console.log(products);

  function handleClearFilter() {
    setSearchTerm("");
    setPriceRange([0, 100 * 50]);
    setSelectedCategory("");
  }

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
          <Option value="desc">Low to High</Option>
          <Option value="asc">High to Low</Option>
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
          {isLoading ? (
            <Loading />
          ) : !products.data.length ? (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the product you search does not exist."
              extra={
                <Button danger onClick={handleClearFilter}>
                  Clear Filter
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.data.map((product: IProduct) => (
                <ProductCard {...product} key={product.id} />
              ))}
            </div>
          )}

          <Pagination
            align="end"
            pageSize={16}
            current={products?.meta?.page}
            onChange={(val) => setCurrentPage(val)}
            showSizeChanger={false}
            total={products?.meta.total}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
