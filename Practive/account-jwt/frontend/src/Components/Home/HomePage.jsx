import { useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const HomePage = () => {
  let axiosJWT = axios.create();

  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.login?.currentUser);
  const message = useSelector((state) => state.users?.message);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLogin) {
      navigate("/login");
    }
    if (userLogin?.accessToken) {
      getAllUsers(userLogin?.accessToken, dispatch);
    }
  }, []);

  const handleDelete = (id) => {
    deleteUser(userLogin?.accessToken, dispatch, id);
  };

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

  // Trước khi gửi request sẽ phải thực hiện những công việc sau:
  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(userLogin?.accessToken);
      if (decodedToken < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...userLogin,
          accessToken: data.accessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${userLogin?.admin ? `Admin` : `User`}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                {" "}
                Delete{" "}
              </div>
            </div>
          );
        })}
      </div>

      <div className="errorMessage" style={{ marginTop: "100px" }}>
        {message}
      </div>
    </main>
  );
};

export default HomePage;
