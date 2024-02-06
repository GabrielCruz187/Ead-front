"use client";
import EpisodeList from "@/components/CourseComponents/EpisodeList";
import styles from "./styles.module.scss";
import HeaderAuth from "@/components/HomeAuthComponents/headerAuth/HeaderAuth";
import courseService, { CourseType } from "@/services/courseService";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import Footer from "@/components/HomeNoAuthComponents/Footer/Footer";
import { useRouter } from "next/navigation";
import PageSpinner from "@/components/common/pageSpinner/PageSpinner";

type ParamsProps = {
  params: { id: number | string };
};

const getCourseId = async ({ params }: ParamsProps) => {
  const courseId = params.id;

  if (typeof courseId !== "string") return;

  const res = await courseService.getEpisodes(courseId);

  if (res.status === 200) {
    return res.data;
  }
};


export default function Course({ params }: ParamsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseType>();

  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const courseId = params.id;
  const getCourse = async () => {
    const course = await getCourseId({ params });
    setCourse(course);
    setLiked(course.liked);
    setFavorited(course.favorited);
  };
  const handleLikeCourse = async () => {
    if (liked === true) {
      await courseService.removeLike(courseId);
      setLiked(false);
    } else {
      await courseService.like(courseId);
      setLiked(true);
    }
  };
  const handleFavCourse = async () => {
    if (favorited === true) {
      await courseService.removeFav(courseId);
      setFavorited(false);
    } else {
      await courseService.addToFav(courseId);
      setFavorited(true);
    }
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);
  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),
              url(${process.env.NEXT_PUBLIC_APIURL}/${course?.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "450px",
          }}>
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button outline className={styles.courseBtn} disabled={course?.episodes?.length === 0 ? true : false}>
            ASSISTIR AGORA!
            <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg} />
          </Button>
          <div className={styles.interactions}>
            {liked === false ? (
              <img src="/course/iconLike.svg" alt="likeImage" className={styles.interactionImages} onClick={() => handleLikeCourse()} />
            ) : (
              <img src="/course/iconLiked.svg" alt="likedImage" className={styles.interactionImages} onClick={() => handleLikeCourse()} />
            )}
            {favorited === false ? (
              <img onClick={() => handleFavCourse()} src="/course/iconAddFav.svg" alt="addFav" className={styles.interactionImages} />
            ) : (
              <img onClick={() => handleFavCourse()} src="/course/iconFavorited.svg" alt="favorited" className={styles.interactionImages} />
            )}
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>EPISÓDIOS</p>
          <p className={styles.episodeLength}>{course?.episodes?.length} episódios</p>
          {course?.episodes?.length === 0 ? (
            <p>
              <strong>Não temos episódios ainda, volte outra hora! &#x1F606;&#x1F918;</strong>
            </p>
          ) : (
            course?.episodes?.map((episode) => <EpisodeList key={episode.id} episode={episode} course={course} />)
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
}
