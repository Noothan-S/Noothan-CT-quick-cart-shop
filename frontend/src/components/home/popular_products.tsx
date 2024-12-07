import { Link } from 'react-router-dom';

const products = [
    { id: 1, name: 'Wireless Earbuds', price: 59.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Smart Watch', price: 199.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Leather Backpack', price: 79.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 4, name: 'Portable Charger', price: 39.99, image: '/placeholder.svg?height=200&width=200' },
];

export default function PopularProducts() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Popular Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">{product.name}</h3>
                                <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
