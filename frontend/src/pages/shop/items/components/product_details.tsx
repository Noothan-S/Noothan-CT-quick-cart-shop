const ProductDetails = ({ product }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-2xl font-semibold text-primary mb-2">
        ${product.price.toFixed(2)}
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        Category: {product.category}
      </p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
