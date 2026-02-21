import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

import Layout from "../components/Layout";

function LoginPage() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, redirect, session]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function SubmitHandler({ email, password }) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        console.log("failure", result.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
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

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false });
// export default LoginPage;
