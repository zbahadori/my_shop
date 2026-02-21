import Layout from "../components/Layout";

export default function unauthorized() {
  return (
    <Layout title="Access Denied">
      <h2 className="text-xl">Access Denied</h2>
    </Layout>
  );
}
