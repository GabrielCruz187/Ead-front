"use client";
import FavoriteCourse from "@/components/HomeAuthComponents/favoriteCourses/FavoriteCourses";
import FeaturedCategory from "@/components/HomeAuthComponents/featuredCategory/FeaturedCategory";
import FeaturedSection from "@/components/HomeAuthComponents/featuredSection/FeaturedSection";
import HeaderAuth from "@/components/HomeAuthComponents/headerAuth/HeaderAuth";
import ListCategories from "@/components/HomeAuthComponents/listCategories/ListCategories";
import NewestCategory from "@/components/HomeAuthComponents/newestCategory/NewestCategory";
import Footer from "@/components/HomeNoAuthComponents/Footer/Footer";
import Loading from "@/components/common/LoadingAnimation/Loading";
import { useEffect, useState } from "react";

export default function HomeAuth() {
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setContentReady(true);
    };
    fetchData();
  }, []);
  return (
    <>
      {contentReady ? (
        <main>
          <HeaderAuth />
          <FeaturedSection />
          <NewestCategory />
          <FavoriteCourse />
          <FeaturedCategory />
          <ListCategories />
          <Footer />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
