
"use client";
import { useState, useEffect } from "react";
import CategorySlider from "@/components/CategorySlider";
import AddTopBanner from "@/components/HomeComponent/AddTopBanner";
import TopBanner from "@/components/HomeComponent/TopBanner";

import NaturalGradientProduct from "@/components/NaturalGradientProduct";
import ImageBanner from "@/HomePageComponent/ImageBanner";
import BeautyProductsGrid from "./homepage/page";
import BannerGridtwo from "./bannertwo/page";
import ProductskinListingPage from "./productpageskin/page";
import FullWidthVideo from "@/HomePageComponent/FullWidthVideo";
import ResponsiveVideoCarousel from "@/HomePageComponent/ResponsiveVideoCarousel";
import BeautyBoxVisibleDescriptions from "@/HomePageComponent/BeautyBoxVisibleDescriptions";
import HimHerTabs from "@/HomePageComponent/HimHerTabs";
import StylishHerBanner from "@/HomePageComponent/StylishHerBanner";
import { useTheme } from "@/app/context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CategorySlider /> 
      <BeautyBoxVisibleDescriptions />
      <HimHerTabs />
      
      {theme === "her" ? (
        <StylishHerBanner />
      ) : (
        <BeautyProductsGrid />
      )}
     
      {/* <TopBanner /> */}
      {/* <AddTopBanner /> */}
      
      <ProductskinListingPage />
        
      <ImageBanner />
      <BannerGridtwo /> 
      <ProductskinListingPage />
      <ResponsiveVideoCarousel />
      <NaturalGradientProduct />
     
    </>
  );
}
