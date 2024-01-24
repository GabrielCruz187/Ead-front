'use client'
import PageSpinner from '@/components/common/pageSpinner/PageSpinner';
import styles from './styles.module.scss'
import courseService, { CourseType } from "@/services/courseService";
import Link from "next/link";
import { Button, Container } from "reactstrap";
import useSWR from "swr";

export default function FeaturedSection(){
    const {data, error} = useSWR("/featured", courseService.fetchFeaturedCourses);

    if (error) return error;
    if (!data) 
    return (<><PageSpinner/></>);

    return (
      <>
        {
          data.data?.map((course: CourseType) => (
            <div
              className={styles.course}
              style={{
                backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_APIURL}/${course.thumbnailUrl})`,
              }}>
              <Container>
                <p className={styles.title}>{course.name}</p>
                <p className={styles.description}>{course.synopsis}</p>
                <Link href={`/courses/${course.id}`}>
                  <Button outline color="light" className={styles.button}>
                    ACESSE AGORA!
                    <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg} />
                  </Button>
                </Link>
              </Container>
            </div>
          ))[0]
        }
      </>
    );
}