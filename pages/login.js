import Layout from "../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function SubmitHandler({ email, password }) {}
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <h2 className="mb-4 text-xl">Login</h2>
        <div className="mb-4">
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-full rounded-xl p-2 outline-0 bg-white"
            id="email"
            placeholder="Email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">Please Enter Email...</div>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("password", {
              required: true,
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
            type="password"
            className="w-full rounded-xl p-2 outline-0 bg-white"
            id="password"
            placeholder="Password"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">
            Login
          </button>
        </div>
        <div className="mb-4">
          <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
