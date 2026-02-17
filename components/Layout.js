import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import { CartContext } from "../context/Cart";

function Layout({ title, children }) {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>{`${title} - Shopping`}</title>
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-14 px-8 justify-between items-center border-b-4 bg-white">
            <Link href="/" className="text-lg font-bold text-gray-700">
              Shopping
            </Link>
            <div>
              <Link href="/cart" className="p-2 text-gray-700">
                Cart
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-xl bg-gray-200 px-2 py-1 text-xs font-bold">
                    {cart.cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                  </span>
                )}
              </Link>
              <Link href="/login" className="p-2 text-gray-700">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10">
          Footer
        </footer>
      </div>
    </>
  );
}

export default Layout;
