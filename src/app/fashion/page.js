import CarouselBanner from "@/HomePageComponent/CarouselBanner";
import ProductListingPage from "../productdisplay/page";
import ProductBannerPageTwo from "@/components/ProductBannerPageTwo";
import ProductskinListingPage from "../productpageskin/page";
import ProductBannerPage from "@/components/ProductBannerPage";
import ProductListingPagetwo from "../productpage/page";




export default function Fashion() {
    return (
        <>



            <CarouselBanner />
            {/* <ProductListingPage /> */}
               <ProductListingPagetwo />
            {/* <ProductskinListingPage /> */}
             {/* <ProductListingPagetwo /> */}
            <ProductBannerPage />
           

        </>
    );
}
