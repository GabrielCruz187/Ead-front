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
      const response = await api.post("/auth/register", params);
      return { data: response.data, status: response.status }; // Retorne um objeto com data e status
    } catch (error: any) {
      // Trate todos os tipos de erro
      if (error.response) {
        // Se houver uma resposta do servidor
        return {
          data: error.response.data,
          status: error.response.status,
        };
      }
      // Caso contrário, você pode retornar um erro genérico
      return { data: { message: "Erro ao registrar. Tente novamente." }, status: 500 };
    }
  },

  login: async (params: LoginParams) => {
    try {
      const response = await api.post("/auth/login", params);
      if (response.status === 200 || response.status === 201) {
        sessionStorage.setItem("onebitflix-token", response.data.token);
      }
      return { data: response.data, status: response.status }; // Retorne um objeto com data e status
    } catch (error: any) {
      // Trate todos os tipos de erro
      if (error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
        };
      }
      return { data: { message: "Erro ao conectar ao servidor. Tente novamente." }, status: 500 };
    }
  },
};

export default authService;

