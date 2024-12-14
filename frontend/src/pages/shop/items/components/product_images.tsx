import { FC, useState } from "react";

const ProductImages: FC<{ images: string[] }> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div>
      {/* Main Product Image */}
      <div className="w-full h-96">
        <img
          src={images[currentImage]}
          alt={`Product image ${currentImage + 1}`}
          className="w-full h-full rounded-lg shadow-md mb-4 object-cover"
        />
      </div>
      {/* Thumbnails */}
      <div className="flex space-x-2 mt-5">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-20 h-20 rounded-md overflow-hidden ${
              index === currentImage ? "ring-2 ring-red-500" : ""
            }`}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
