"use client";

import CardsSection from "@/components/homeNoAuth/CardsSection/CardsSection";
import styles from "./page.module.scss";
import HeaderNoAuth from "@/components/homeNoAuth/HeaderNoAuth/HeaderNoAuth";
import PresentationSection from "@/components/homeNoAuth/PresentationSection/PresentationSection";
import SlideSection from "@/components/homeNoAuth/SlideSection/SlideSection";
import courseService, { CourseType } from "@/services/courseService";
import { ReactNode, useEffect, useState } from "react";
import Footer from "@/components/homeNoAuth/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export const revalidate = 3600*24;
interface HomeNotAuthPageProps {
  children?: ReactNode;
  course: CourseType[];
}

interface HomeNotAuthPageProps {
  children?: ReactNode;
  course: CourseType[];
}

export default function HomeNotAuth({ course }: HomeNotAuthPageProps) {
  const [newestCourse, setNewestCourses] = useState(course);
  const fetchCourses = async () => {
    const courses: CourseType[] = await courseService.fetchNewestCourses();
    setNewestCourses(courses);
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

