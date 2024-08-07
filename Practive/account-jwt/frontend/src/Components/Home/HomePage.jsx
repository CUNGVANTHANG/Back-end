import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { createAxios } from "../../redux/createInstance";
import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import { loginSuccess } from "../../redux/authSlice";

const HomePage = () => {
  const userLogin = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);
  const message = useSelector((state) => state.users?.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(userLogin, dispatch, loginSuccess);

  const handleDelete = (id) => {
    deleteUser(userLogin?.accessToken, dispatch, id, axiosJWT);
  };

  useEffect(() => {
    if (!userLogin) {
      navigate("/login");
    }
    if (userLogin?.accessToken) {
      getAllUsers(userLogin?.accessToken, dispatch, axiosJWT);
    }
  }, []);

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
