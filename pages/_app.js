import { SessionProvider } from "next-auth/react";

import { CartContextProvider } from "../context/Cart";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className="bg-gray-100">
      <SessionProvider>
        <CartContextProvider session={session}>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </div>
  );
}

export default MyApp;
