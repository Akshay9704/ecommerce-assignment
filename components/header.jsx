import Link from 'next/link';

export default function Header({ font }) {
  return (
    <header className="py-2 bg-gray-952 ">
      <div className="max-w-[100rem] px-12 mx-auto flex justify-between">
        <Link href="/">
          <h1 className={`uppercase text-yellow-500 text-center py-2 ${font}`}>
            Ecommerce
          </h1>
        </Link>
        <Link
          href="/products/cart"
          className="uppercase text-green-951 text-xl py-2 hover:text-yellow-700"
        >
          Cart
        </Link>
      </div>
    </header>
  );
}