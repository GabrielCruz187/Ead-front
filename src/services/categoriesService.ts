import api from "@/app/api/route";
import { CourseType } from "./courseService";

export type CategoryType = {
  id: number;
  name: string;
  position: number;
  courses?: CourseType[];
};

const categoriesService = {
  getCategories: async () => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const categories = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return categories;
    } catch (error: any) {
      return error.response;
    }
  },
  getCourse: async (id: number) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const categories = await api.get(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return categories;
    } catch (error: any) {
      return error.response;
    }
  },
};

export default categoriesService;
