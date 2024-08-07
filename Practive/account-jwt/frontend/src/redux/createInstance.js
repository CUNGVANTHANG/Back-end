import axios from "axios";
import { jwtDecode } from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post("/v1/auth/refresh", {
      withCredentials: true, // send cookies
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (userLogin, dispatch, stateSuccess) => {
  const newInstance = axios.create();

  // Trước khi gửi request sẽ phải thực hiện những công việc sau:
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(userLogin?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...userLogin,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
