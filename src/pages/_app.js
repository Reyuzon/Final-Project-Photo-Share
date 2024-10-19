import BottomNav from "@/components/BottomNav";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import store from "@/store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Rubik } from "next/font/google";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { p } = router.query;

  const noNavbarRoutes = ["/login", "/signup"];
  return (
    <div className={`font-rubik ${rubik.variable}`}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          {!noNavbarRoutes.includes(router.pathname) ? (
            <Fragment>
              <Sidebar />
              <main>
                <div className="p-4 sm:ml-64">
                  <div className="p-4">
                    <Component {...pageProps} />
                    {p && (
                      <div className="w-full h-full z-[9999] fixed overflow-hidden bg-black/50 top-0 left-0 p-0 md:p-4">
                        <Post id={p} />
                      </div>
                    )}
                  </div>
                </div>
              </main>
              <BottomNav />
            </Fragment>
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
      </QueryClientProvider>
    </div>
  );
}
