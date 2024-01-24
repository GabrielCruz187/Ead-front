"use client";
import styles from "./styles.module.scss";
import SlideComponent from "@/components/common/SlideComponent";

import useSWR from "swr";
import courseService from "../../../services/courseService";
import PageSpinner from "@/components/common/pageSpinner/PageSpinner";

export default function NewestCategory() {
  const { data, error } = useSWR("/newest", courseService.fetchNewestCourses);

  if (error) return error;
  if (!data)
    return (
      <>
        <PageSpinner />
      </>
    );
  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent course={data.data} />
    </>
  );
}
