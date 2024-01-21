import FavoriteCourse from "@/components/HomeAuthComponents/favoriteCourses/FavoriteCourses";
import FeaturedCategory from "@/components/HomeAuthComponents/featuredCategory/FeaturedCategory";
import FeaturedSection from "@/components/HomeAuthComponents/featuredSection/FeaturedSection";
import HeaderAuth from "@/components/HomeAuthComponents/headerAuth/HeaderAuth";
import ListCategories from "@/components/HomeAuthComponents/listCategories/ListCategories";
import NewestCategory from "@/components/HomeAuthComponents/newestCategory/NewestCategory";
import Footer from "@/components/HomeNoAuthComponents/Footer/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onebitflix - Home",
  icons: "./favicon.svg",
};

export default async function  HomeAuth() {
  await new Promise ((resolve)=>setTimeout(resolve,3000))
  return (
    <>
      <main>
        <HeaderAuth />
        <FeaturedSection />
        <NewestCategory />
        <FavoriteCourse/>
        <FeaturedCategory />
        <ListCategories/>
        <Footer/>
      </main>
    </>
  );
}
