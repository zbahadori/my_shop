import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

function Product({ item }) {
  return (
    <div className="bg-white rounded-xl mb-5 block">
      <Link href={`/product/${item.slug}`}>
        <Image
          src={item.image}
          width={1}
          height={1}
          className="rounded-t-xl"
          alt={item.title}
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${item.slug}`}>
          <h2 className="text-lg">{item.title}</h2>
        </Link>
        <p className="p-2">{item.price}</p>
        <button className="rounded-xl bg-gray-700 text-white px-4 py-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Product), { ssr: false });
