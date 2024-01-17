import api from "@/app/api/route";
import { cache } from "react";


export type EpisodeType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
};
export type CourseType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  episodes?: EpisodeType[];
};

const courseService = {
  fetchNewestCourses:  cache (async () => {
    try {
      const newestCourses: CourseType[] = await api.get("/courses/newest").then((res) => res.data);
      return newestCourses
    } catch (error:any) {
      return error.response;
    }
  })
};

export default courseService;
