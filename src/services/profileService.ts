import api from "@/app/api/route";

interface UserParams {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
}

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}
const profileService = {
  fetchCurrentUser: async () => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const currentUser = await api.get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return currentUser;
    } catch (error: any) {
      return error.response;
    }
  },

  userUpdate: async (params: UserParams) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const currentUser = await api.put("/users/current", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return currentUser;
    } catch (error: any) {
      return error.response;
    }
  },
  passwordUpdate: async (params: PasswordParams) => {
    try {
      const token = sessionStorage.getItem("onebitflix-token");

      const currentUser = await api.put("/users/current/password", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return currentUser;
    } catch (error: any) {
      return error.response;
    }
  },
};

export default profileService;
