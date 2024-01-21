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

  fetchNewestCourses: cache(async () => {
    try {
      const newestCourses: CourseType[] = await api.get("/courses/newest");
      return newestCourses;
    } catch (error: any) {
      return error.response;
    }
  }),

  fetchFeaturedCourses: async () => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const featured = await api.get("/courses/featured", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return featured;
    } catch (error: any) {
      return error.response;
    }
  },

  addToFav: async (courseId: number | string) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");
      const favorite = await api.post(
        "/favorites",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { courseId },
        }
      );
      return favorite;
    } catch (error: any) {
      return error.response;
    }
  },

  removeFav: async (courseId: number | string) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const favorite = await api.delete("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return favorite;
    } catch (error: any) {
      return error.response;
    }
  },
  getFavCourses: async () => {
    try {
       const token = sessionStorage.getItem("onebitflix-token");

    const favorite = await api
      .get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return favorite;
    } catch (error: any) {
      return error.response;
    }
  },
};

export default courseService;
