import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Partials/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { useEffect } from "react";
import { localTokenKey } from "./constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./Store/Slices/user";
import PrivateRoute from "./Routes/PrivateRoute";
import Posts from "./Pages/Posts";
import Post from "./Pages/Post";
import CreateProfile from "./Pages/CreateProfile";
import AddExperience from "./Pages/AddExperience";
import AddEducation from "./Pages/AddEducation";
import NotFound from "./Pages/NotFound";

function App() {
  const token = localStorage.getItem(localTokenKey);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token)
      axios
        .get("/auth")
        .then(({ data }) => {
          dispatch(setUser(data));
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem(localTokenKey);
          navigate("login");
        });
    else navigate("/login");
  }, [token, navigate, dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" />
        <Route path="/profile" />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/edit-profile" />
        <Route path="/add-exp" element={<AddExperience />} />
        <Route path="/add-edu" element={<AddEducation />} />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
