"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { CartProvider } from "@/app/context/CartContext";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { usePathname } from "next/navigation";
import ScrollingBanner from "@/components/ScrollingBanner";
import NavBar from "@/components/NavBar";
import ToastProvider from "@/components/ToastProvider";
import FeaturesBanner from "@/components/FeaturesBanner";
import Footer from "@/components/Footer";
import FooterBanner from "@/components/FooterBanner";

export default function Providers({ children }) {
  const pathname = usePathname();
  const isFullScreenSearch = pathname?.startsWith("/fullsearchbar");

  return (
    <Provider store={store}>
      <ThemeProvider>
        <CartProvider>
          {!isFullScreenSearch && (
            <>
              <ScrollingBanner />
              <div
                id="navbar-wrapper"
                className="fixed z-[100] w-full transition-all duration-500"
              >
                <NavBar />
              </div>
            </>
          )}

          <ToastProvider />

          <main className={isFullScreenSearch ? "" : "pt-[125px]"}>
            {children}
          </main>

          {!isFullScreenSearch && (
            <>
              <FeaturesBanner />
              <Footer />
              <FooterBanner />
            </>
          )}
        </CartProvider>
      </ThemeProvider>
    </Provider>
  );
}
