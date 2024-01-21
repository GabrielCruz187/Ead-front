"use client"
import courseService from "@/services/courseService";
import styles from "./styles.module.scss"
import useSWR from "swr";
import SlideComponent from "@/components/common/SlideComponent";

export default function FavoriteCourse(){
    const { data, error } = useSWR("/favCourses", courseService.getFavCourses);
    if (error) return error;
    if (!data) return <><p>Loading...</p></>;
    return (
      <>
        <p className={styles.titleCategory}>Minha Lista</p>
        {data.data.courses.length >= 1 ? (
          <SlideComponent course={data.data.courses} />
        ) : (
          <p className="h5 text-center pt-3">
            <strong>Você não tem nenhum curso na lista</strong>
          </p>
        )}
      </>
    );

}