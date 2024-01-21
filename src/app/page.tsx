"use client";

import CardsSection from "@/components/HomeNoAuthComponents/CardsSection/CardsSection";
import styles from "./page.module.scss";
import HeaderNoAuth from "@/components/HomeNoAuthComponents/HeaderNoAuth/HeaderNoAuth";
import PresentationSection from "@/components/HomeNoAuthComponents/PresentationSection/PresentationSection";
import SlideSection from "@/components/HomeNoAuthComponents/SlideSection/SlideSection";
import courseService, { CourseType } from "@/services/courseService";
import { ReactNode, useEffect, useState } from "react";
import Footer from "@/components/HomeNoAuthComponents/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export const revalidate = 3600 * 24;

interface HomeNotAuthPageProps {
  children?: ReactNode;
  course: CourseType[];
}

export default function HomeNotAuth({ course }: HomeNotAuthPageProps) {
  const [newestCourse, setNewestCourses] = useState(course);
  const fetchCourses = async () => {
    const courses = await courseService.fetchNewestCourses();
    setNewestCourses(courses.data);
  };

  useEffect(() => {
    fetchCourses();
  }, [newestCourse]);

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <main>
        <div className={styles.sectionBackground} data-aos="fade-zoom-in" data-aos-duration="1600">
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-right" data-aos-duration="1200">
          <CardsSection />
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <SlideSection newestCourses={newestCourse} />
        </div>
        <Footer />
      </main>
    </>
  );
}
