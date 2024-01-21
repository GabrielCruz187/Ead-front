'use client'
import styles from "./styles.module.scss";

import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "@/components/common/SlideComponent";
// import SwrSpinner from "../../common/swrSpinner";

export default function FeaturedCategory() {
    const { data, error } = useSWR("/featured", courseService.fetchFeaturedCourses);

    if (error) return error;
    if (!data) return <><p>Loading...</p></>;
  return (
    <>
      <p className={styles.titleCategory}>EM DESTAQUE</p>
      <SlideComponent course={data.data} />
    </>
  );
}
