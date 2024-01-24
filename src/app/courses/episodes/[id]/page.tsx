"use client";
import EpisodeList from "@/components/CourseComponents/EpisodeList";
import styles from "./styles.module.scss";
import HeaderAuth from "@/components/HomeAuthComponents/headerAuth/HeaderAuth";
import courseService, { CourseType } from "@/services/courseService";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Button, Container } from "reactstrap";
import Footer from "@/components/HomeNoAuthComponents/Footer/Footer";
import { useRouter } from "next/navigation";
import HeaderGeneric from "@/components/common/headerGeneric/HeaderGeneric";
import PageSpinner from "@/components/common/pageSpinner/PageSpinner";
import ReactPlayer from "react-player";
import watchEpisodeService from "@/services/episodeService";

export default function EpisodePlayer({
  params,
  searchParams,
}: {
  params: { id: number | string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseType>();

  const episodeOrder = parseFloat(params.id.toString() || "");
  const episodeId = parseFloat(searchParams?.episodeid?.toString() || "");
  const courseId = searchParams?.courseid?.toString() || "";

  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);

  const handleGetEpisodeTime = async () => {
    const res = await watchEpisodeService.getWatchTime(episodeId);
    if (res.data !== null) {
      setGetEpisodeTime(res.data.watchTime.seconds);
    }
  };

  const handleSetEpisodeTime = async () => {
    await watchEpisodeService.setWatchTime({
      episodeId: episodeId,
      seconds: Math.round(episodeTime),
    });
  };
  useEffect(() => {
    handleGetEpisodeTime();
  }, [router]);

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  };
  if (isReady === true) {
    setTimeout(() => {
      handleSetEpisodeTime();
    }, 3000);
  }

  const getCourse = async () => {
    if (typeof courseId !== "string") return;
    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    router.push(`/courses/episode/${episodeOrder - 1}?courseid=${course?.id}&episodeid=${episodeId - 1}`);
  };
  const handleNextEpisode = () => {
    router.push(`/courses/episode/${episodeOrder + 1}?courseid=${course?.id}&episodeid=${episodeId + 1}`);
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

  if (course?.episodes == undefined) return <PageSpinner />;

  if (episodeOrder + 1 < course.episodes.length) {
    if (Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong) {
      handleNextEpisode();
    }
  }
  return (
    <>
      <main>
        <HeaderGeneric logoUrl="/home" btnContent={`Voltar para o curso`} btnUrl={`/courses/${courseId}`} />
        <Container className="d-flex flex-column align-items-center gap-3 pt-3">
          <p className={styles.episodeTitle}>{course.episodes[episodeOrder].name}</p>
          {typeof window == "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${process.env.NEXT_PUBLIC_APIURL}/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("onebitflix-token")}`}
              controls
              ref={playerRef}
              onStart={() => handlePlayerTime()}
              onProgress={(progress) => {
                setEpisodeTime(progress.playedSeconds);
              }}
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button className={styles.episodeButton} disabled={episodeOrder === 0 ? true : false} onClick={() => handleLastEpisode()}>
              <img src="/episode/iconArrowLeft.svg" alt="setaEsquerda" className={styles.arrowImg} />
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder + 1 === course.episodes.length ? true : false}
              onClick={() => handleNextEpisode()}>
              <img src="/episode/iconArrowRight.svg" alt="setaDireita" className={styles.arrowImg} />
            </Button>
          </div>
          <p className="text-center pb-4">{course.episodes[episodeOrder].synopsis}</p>
        </Container>
      </main>
    </>
  );
}
