"use client";
import categoriesService, { CategoryType } from "@/services/categoriesService";
import styles from "./styles.module.scss";
import useSWR from "swr";
import SlideComponent from "@/components/common/SlideComponent";

interface props {
  categoryId: number;
  categoryName: string;
}

export default function ListCategoriesSlide({ categoryId, categoryName }: props) {
  const { data, error } = useSWR(`/categories/${categoryId}`, () =>
	categoriesService.getCourse(categoryId));

  if (error) return error;
  if (!data) return <></>;

return (
  <>
    <p className={styles.titleCategory}>{categoryName}</p>
    <SlideComponent course={data.data.courses} />
  </>
);
}
