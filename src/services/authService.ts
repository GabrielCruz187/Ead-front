import api from "@/services/api/route";

interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  firstName: string;
  lastName: string;
  phone: string;
  birth: string;
  email: string;
  password: string;
}

const authService = {
  register: async (params: RegisterParams) => {
    try {
      const authenticate = await api.post("/auth/register", params);
      return authenticate;
    } catch (error: any) {
      if (error.response.status === 400) return error.response;
    }
  },

  login: async (params: LoginParams) => {
    try {
      const authenticate = await api.post("/auth/login", params);
      if (authenticate.status === 200 || authenticate.status === 201)
        sessionStorage.setItem("onebitflix-token", authenticate.data.token);
      return authenticate;
    } catch (error: any) {
      if (error.response.status === 400 || error.response.status === 401) return error.response;
    }
  },
};

export default authService;
