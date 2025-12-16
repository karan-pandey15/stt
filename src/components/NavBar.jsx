"use client";
import { useState, useEffect, useCallback } from "react";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import Link from "next/link";
import SearchBar from "./searchbar/SearchBar";
import WishlistDrawer from "./WishlistDrawer";
import { useSelector } from "react-redux";
import CartDrawer from "./CartDrawer";
import { useCartDrawer } from "@/app/context/CartContext";
import ColorPicker from "./ColorPicker";
import { useRouter } from "next/navigation";
import api from "../app/lib/api";
import { useTheme } from "@/app/context/ThemeContext";

const NavBar = () => {
  const { primary, logo, light } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isCartOpen, setIsCartOpen } = useCartDrawer();
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const syncAuthState = useCallback(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.role) {
          setUserRole(parsedUser.role);
          setIsLoggedIn(true);
          return;
        }
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
    setUserRole(null);
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    syncAuthState();
    const handleStorage = () => syncAuthState();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [syncAuthState]);

  const handleLogout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setUserRole(null);
    setIsLoggedIn(false);
    router.push("/");
  }, [router]);

  const defaultNavItems = [
    { href: "/productpage", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/fashion", label: "StylishHim Fashion" },
    { href: "/contactus", label: "Contact Us" },
    { href: "/helpcenter", label: "Help" },
  ];

  const userNavItems = [
    { href: "/orders", label: "Orders" }, 
    { href: "/profile", label: "Profile" },
    { label: "Logout", onClick: handleLogout },
  ];

  const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/addproducts", label: "Add Products" },
    { href: "/admin/allusers", label: "All Users" },
    { href: "/admin/allproducts", label: "All Products" },
    { href: "/admin/alltransation", label: "All Transation" },
    { label: "Logout", onClick: handleLogout },
  ];

  let navItems = [];

  if (isLoggedIn && userRole === "admin") {
    navItems = adminNavItems;
  } else if (isLoggedIn && userRole === "user") {
    navItems = [...defaultNavItems, ...userNavItems];
  } else {
    navItems = [...defaultNavItems, { href: "/signin", label: "Sign In" }];
  }

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = useSelector((state) => state.favourite.items);
  const wishlistCount = wishlistItems.length;

  const AnimatedLogo = () => (
    <Link href="/" className="flex items-center group mr-2">
      <div className="relative">
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-wider [font-family:'Playfair_Display',_'Cormorant_Garamond',_serif] relative">
          <span 
            className="relative inline-block bg-clip-text text-transparent animate-[gradientShift_4s_ease-in-out_infinite]"
            style={{
              backgroundImage: `linear-gradient(to right, ${primary}, ${primary}cc, ${primary})`
            }}
          >
            {logo}
          </span>
          <span 
            className="absolute inset-0 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${primary}70, transparent)`
            }}
          >
            {logo}
          </span>
          <span 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${primary}, ${primary}cc, ${primary})`
            }}
          >
            {logo}
          </span>
        </h1>
        <div 
          className="absolute -bottom-1 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 mx-auto rounded-full shadow-lg"
          style={{
            background: `linear-gradient(to right, ${primary}, ${primary}cc, ${primary})`,
            boxShadow: `0 0 10px ${primary}40`
          }}
        />
      </div>
    </Link>
  );

  const Icons = (
    <div className="flex items-center space-x-0 md:space-x-3">
      <ColorPicker />
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 text-[#2C2C2C] transition-all duration-300 transform hover:scale-110"
        style={{ color: "#2C2C2C" }}
        onMouseEnter={(e) => e.currentTarget.style.color = primary}
        onMouseLeave={(e) => e.currentTarget.style.color = "#2C2C2C"}
      >
        <ShoppingBag className="h-5 w-5" />
        {totalQuantity > 0 && (
          <span 
            className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-[bounce_1s_ease-in-out_infinite]"
            style={{ backgroundColor: primary }}
          >
            {totalQuantity}
          </span>
        )}
      </button>
      <button
        onClick={() => setIsWishlistOpen(true)}
        className="relative p-2 text-[#2C2C2C] transition-all duration-300 transform hover:scale-110"
        style={{ color: "#2C2C2C" }}
        onMouseEnter={(e) => e.currentTarget.style.color = primary}
        onMouseLeave={(e) => e.currentTarget.style.color = "#2C2C2C"}
      >
        <Heart className="h-5 w-5" />
        {wishlistCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg"
            style={{ backgroundColor: primary }}
          >
            {wishlistCount}
          </span>
        )}
      </button>
    </div>
  );

  const renderNavItem = ({ href, label, onClick }) => {
    if (onClick) {
      return (
        <button
          key={label}
          onClick={async () => {
            await onClick();
            setIsMenuOpen(false);
          }}
          className="text-[14px] font-[500] text-[#2C2C2C] transition-all duration-300 [font-family:'Raleway',_'Lato',_sans-serif] relative group/link"
          style={{ color: "#2C2C2C" }}
          onMouseEnter={(e) => e.currentTarget.style.color = primary}
          onMouseLeave={(e) => e.currentTarget.style.color = "#2C2C2C"}
        >
          {label}
          <span 
            className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover/link:w-full"
            style={{ backgroundColor: primary }}
          />
        </button>
      );
    }
    return (
      <Link
        key={label}
        href={href}
        className="text-[14px] font-[500] text-[#2C2C2C] transition-all duration-300 [font-family:'Raleway',_'Lato',_sans-serif] relative group/link"
        style={{ color: "#2C2C2C" }}
        onMouseEnter={(e) => e.currentTarget.style.color = primary}
        onMouseLeave={(e) => e.currentTarget.style.color = "#2C2C2C"}
      >
        {label}
        <span 
          className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover/link:w-full"
          style={{ backgroundColor: primary }}
        />
      </Link>
    );
  };

  const renderMobileNavItem = ({ href, label, onClick }) => {
    if (onClick) {
      return (
        <button
          key={label}
          onClick={async () => {
            await onClick();
            setIsMenuOpen(false);
          }}
          className="text-[14px] font-[500] block px-3 py-2 text-[#2C2C2C] rounded [font-family:'Raleway',_'Lato',_sans-serif] transition-all duration-300 text-left"
          style={{ 
            color: "#2C2C2C",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = primary;
            e.currentTarget.style.backgroundColor = light;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#2C2C2C";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {label}
        </button>
      );
    }
    return (
      <Link
        key={label}
        href={href}
        className="text-[14px] font-[500] block px-3 py-2 text-[#2C2C2C] rounded [font-family:'Raleway',_'Lato',_sans-serif] transition-all duration-300"
        style={{ 
          color: "#2C2C2C",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = primary;
          e.currentTarget.style.backgroundColor = light;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#2C2C2C";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />

      <nav className="bg-[#FFFFFF]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex md:hidden justify-between items-center h-14">
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-[#2C2C2C] transition-colors"
                style={{ color: "#2C2C2C" }}
                onMouseEnter={(e) => e.currentTarget.style.color = primary}
                onMouseLeave={(e) => e.currentTarget.style.color = "#2C2C2C"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <AnimatedLogo />
            </div>
            {Icons}
          </div>
          <div className="flex md:hidden mb-4 w-full">
            <SearchBar />
          </div>

          <div className="hidden md:flex justify-between items-center h-16">
            <AnimatedLogo />
            <div className="flex items-center space-x-8">
              {navItems.map(renderNavItem)}
            </div>
            <div className="flex-1 max-w-md mx-8">
              <SearchBar />
            </div>
            {Icons}
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-[slideDown_0.3s_ease-out]">
              {navItems.map(renderMobileNavItem)}
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default NavBar;
