"use client";
import styles from "./styles.module.scss";
import SlideComponent from "@/components/common/SlideComponent";

import useSWR from "swr";
import courseService from "../../../services/courseService";

export default function NewestCategory() {
  const { data, error } = useSWR("/newest", courseService.fetchNewestCourses);

  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent course={data.data} />
    </>
  );
}
