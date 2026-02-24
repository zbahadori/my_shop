import Link from "next/link";

import Layout from "../components/Layout";

export default function OrderCompletedPage() {
  return (
    <Layout title="Order Completed">
      <h2 className="mb-4  text-xl">Order Completed</h2>
      <Link href="/order-history">View Order History</Link>
      <div className=""></div>
    </Layout>
  );
}
