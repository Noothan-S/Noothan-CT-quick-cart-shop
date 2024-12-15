import { benefits } from "../../constants/benefits";

export default function Benefits() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Quick<span className="text-red-500">Cart</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div key={title} className="text-center">
              <Icon className="mx-auto h-12 w-12 mb-4" />
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
