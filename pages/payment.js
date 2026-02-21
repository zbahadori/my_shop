import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { CartContext } from "../context/Cart";

export default function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const router = useRouter();

  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const { paymentMethod } = cart;

  const methods = ["Gateway", "Offline Payment"];

  function submitHandler(event) {
    event.preventDefault();

    if (!selectedPaymentMethod) {
      alert("please select payment method");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });

    Cookies.set(
      "cart",
      JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod }),
    );
    router.push("/placeorder");
  }

  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-lg" onSubmit={submitHandler}>
        <h2 className="mb-4  text-xl">Payment Method</h2>
        {methods.map((method) => (
          <div className="mb-4" key={method}>
            <input
              type="radio"
              className="p-2 outline-0 bg-white focus:ring-0"
              id={method}
              checked={selectedPaymentMethod === method}
              onChange={() => setSelectedPaymentMethod(method)}
            />
            <label htmlFor={method} className="p-2 ">
              {method}
            </label>
          </div>
        ))}

        <div className="mb-4 flex justify-between">
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">
            Next
          </button>

          <button
            className="rounded-xl bg-gray-300 text-gray-700  px-4 py-2 w-28"
            onClick={() => router.push("/shipping")}
            type="button "
          >
            Back
          </button>
        </div>
      </form>
    </Layout>
  );
}
