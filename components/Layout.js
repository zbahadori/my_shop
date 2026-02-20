import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { CartContext } from "../context/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((acc, cur) => acc + cur.qty, 0));
  }, [cart.cartItems]);

  function logoutHandler() {
    Cookies.remove();

    signOut({ callbackUrl: "/login" });
  }

  return (
    <>
      <Head>
        <title>{`${title} - Shopping`}</title>
      </Head>
      <ToastContainer position={"bottom-right"} limit={1} />
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
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {state === "loading" ? (
                <div>Loading</div>
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block  ml-2 ">
                  <MenuButton className="text-blue-500 hover:text-blue-700 font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out">
                    {session.user.name}
                  </MenuButton>
                  <MenuItems
                    anchor="bottom"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                  >
                    <MenuItem>
                      <Link
                        href="/profile"
                        className={`${
                          focus ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition duration-150 ease-in-out`}
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        onClick={logoutHandler}
                        className={`${
                          focus ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition duration-150 ease-in-out`}
                      >
                        Logout
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <Link href="/login" className="p-2 text-gray-700">
                  Login
                </Link>
              )}
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
