import { CourseType } from "@/services/courseService";
import Link from "next/link";
import styles from "./style.module.scss"

interface props {
  course: CourseType;
}

export default function SearchCard ({ course }: props) {
  return (
    <>
      <Link href={`/courses/${course.id}`}>
        <div className={styles.searchCard}>
          <img src={`${process.env.NEXT_PUBLIC_APIURL}/${course.thumbnailUrl}`} alt={course.name} className={styles.searchCardImg} />
          <p className={styles.searchCardTitle}>{course.name}</p>
          <p className={styles.searchCardDescription}>{course.synopsis}</p>
        </div>
      </Link>
    </>
  );
};