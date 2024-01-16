import { CourseType } from "@/services/courseService";
import styles from "./styles.module.scss";
import Link from "next/link";

export interface props {
  course: CourseType;
}

export default function SlideCard({ course }: props) {
  return (
    <>
      <Link href={`/courses/${course.id}`}>
        <div className={styles.slide}>
          <img src={`${process.env.NEXT_PUBLIC_APIURL}/${course.thumbnailUrl}`} alt={course.name} className={styles.slideImg} />
          <p className={styles.slideTitle}>{course.name}</p>
          <p className={styles.slideDescription}>{course.synopsis}</p>
        </div>
      </Link>
    </>
  );
}
