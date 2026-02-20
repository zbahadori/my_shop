import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";

import { CartContext } from "../context/Cart";

import db from "../utils/db";
import Product from "../models/product";
import dynamic from "next/dynamic";

function Home({ products }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // فقط در کلاینت true میشه
  }, []);

  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  function addToCartHandler(product) {
    const existingItem = cart.cartItems.find(
      (item) => item.slug === product.slug,
    );

    const qty = existingItem ? existingItem.qty + 1 : 1;

    if (product.count < qty) {
      toast.error("موجودی کافی نیست");
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: { ...product, qty } });

    toast.success("Product added.");
  }

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((pItem) => (
          <ProductItem
            showButton={isClient}
            addToCart={addToCartHandler}
            item={pItem}
            key={pItem.slug}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();
  return {
    props: { products: products.map(db.convertToObj) },
  };
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
