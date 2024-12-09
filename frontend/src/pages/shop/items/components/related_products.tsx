const RelatedProducts = ({ products }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-primary">${product.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
