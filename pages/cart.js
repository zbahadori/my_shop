import Layout from "../components/Layout";

import { useContext } from "react";
import { CartContext } from "../context/Cart";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(CartContext);

  const {
    cart: { cartItems },
  } = state;

  function handleRemove(item) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Heading cart</h1>
      {cartItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="bg-gray-200 dark:bg-gray-700 border-b">
                <tr>
                  <th className="px-5 text-left">item</th>
                  <th className="p-5 text-right">quantity</th>
                  <th className="p-5 text-right">price</th>
                  <th className="p-5 text-right">total price</th>
                  <th className="p-5 ">action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <span className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={50}
                          height={50}
                        />
                        {item.title}
                      </span>
                    </td>
                    <td className="p-5 text-right">{item.qty}</td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-right">{item.price * item.qty}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => handleRemove(item)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5">
            <div className="pb-5">
              Total Price:{" "}
              {cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)}
            </div>
            <div>
              <button
                className="rounded-xl bg-gray-700 text-white px-4 py-2 "
                onClick={() => router.push("/shipping")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
