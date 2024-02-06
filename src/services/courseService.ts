import api from "@/services/api/route";
import { cache } from "react";

export const revalidate = 3600 * 24;

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
        data: { courseId },
      });
      return favorite;
    } catch (error: any) {
      return error.response;
    }
  },
  like: async (courseId: number | string) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");
      const favorite = await api.post(
        "/likes",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return favorite;
    } catch (error: any) {
      return error.response;
    }
  },

  removeLike: async (courseId: number | string) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const favorite = await api.delete("/likes", {
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

      const favorite = await api.get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return favorite;
    } catch (error: any) {
      return error.response;
    }
  },
  getSearch: async (name: string) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");
      const res = await api.get(`/courses/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
  getEpisodes: async (id: number | string) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const res = await api.get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
};

export default courseService;
