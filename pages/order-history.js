import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch("/api/orders/history");
      const data = await response.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);
  return (
    <Layout title="Order History">
      <h2 className="mb-4  text-xl">Order History</h2>
      <div className="">
        {orders.map((order) => (
          <div key={order._id} className="flex p-2">
            <div className="px-2">{order._id}</div>
            <div className="px-2">{order.totalPrice}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
