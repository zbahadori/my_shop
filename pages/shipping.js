import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";

import { CartContext } from "../context/Cart";

function Shipping() {
  const [isClient, setIsClient] = useState(false);
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const { shippingData = {} } = cart;

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      name: shippingData?.name || "",
      address: shippingData?.address || "",
      postalCode: shippingData?.postalCode || "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (shippingData) {
      if (shippingData?.name) setValue("name", shippingData.name);
      if (shippingData?.address) setValue("address", shippingData.address);
      if (shippingData?.postalCode)
        setValue("postalCode", shippingData.postalCode);
    }
  }, [shippingData, setValue]);

  function submitHandler({ name, address, postalCode }) {
    dispatch({
      type: "SAVE_SHIPPING_DATA",
      payload: { name, address, postalCode },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingData: {
          name,
          address,
          postalCode,
        },
      }),
    );

    router.push("/payment");
  }

  // ✅ نمایش لودینگ تا وقتی که کلاینت آماده نشده
  if (!isClient) {
    return (
      <Layout title="Shipping Page">
        <CheckoutWizard activeStep={1} />
        <div className="mx-auto max-w-lg text-center py-10">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="mr-2">در حال بارگذاری...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Shipping Page">
      <CheckoutWizard activeStep={1} />

      <form
        action=""
        className="mx-auto max-w-lg"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className="mb-4  text-xl">Shipping</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full rounded-xl p-2 outline-0 bg-white"
            id="name"
            placeholder="Name"
            autoFocus
            {...register("name")}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full rounded-xl p-2 outline-0 bg-white"
            id="address"
            placeholder="Address"
            {...register("address")}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full rounded-xl p-2 outline-0 bg-white"
            id="postalCode"
            placeholder="Postal Code"
            {...register("postalCode")}
          />
        </div>
        <div className="mb-4">
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}
Shipping.auth = true;
// export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
export default Shipping;
