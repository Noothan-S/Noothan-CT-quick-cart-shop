const ShopInfo = ({ shop }) => {
  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground">
        Sold by:{" "}
        <a href={`/shop/${shop.id}`} className="text-primary hover:underline">
          {shop.name}
        </a>
      </p>
    </div>
  );
};

export default ShopInfo;
