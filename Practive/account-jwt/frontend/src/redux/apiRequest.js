import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "./authSlice";
import {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "./userSlice";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT.get("/v1/user", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());

  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailure(err.response.data));
  }
};

export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("v1/auth/logout", id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailure());
  }
};
