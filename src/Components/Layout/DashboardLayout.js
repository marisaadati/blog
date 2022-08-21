import React, { useEffect, useState } from "react";
import "./DashboardLayout.css";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { domain } from "../../config/constants";

const cookies = new Cookies();
const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [me, setMe] = useState(null);

  const logout = () => {
    cookies.remove("token");
    navigate("/");
  };

  useEffect(() => {
    const token = cookies.get("token");
    fetch("http://localhost:4000/user/me", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (!data._id) return navigate("/");

        setMe(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>loading</h1>;

  return (
    <div>
      <div className="dashboardbody">
        <input type="checkbox" id="ham-menu" />
        <label for="ham-menu">
          <div class="hide-des">
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
          </div>
        </label>

        <div class="full-page-green"></div>
        <div class="ham-menu">
          <ul class="centre-text bold-text">
            <div className="divimg">
              <img
                className="dashboardimg"
                src={`${domain}/${me.avatar}`}
                onError={(e) => {
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/1057/1057089.png";
                }}
              />
            </div>
            <button className="lidashboard" onClick={() => navigate("/")}>
              Home
            </button>
            <button
              className="lidashboard"
              onClick={() => navigate("/dashboard/blog")}
            >
              New Blog
            </button>
            <button
              className="lidashboard"
              onClick={() => navigate("/dashboard/MyBlogs")}
            >
              My Blogs
            </button>

            <button
              className="lidashboard"
              onClick={() => navigate("Editprofile/")}
            >
              Edit Profile
            </button>
            <br />
            <br />
            <br />
            <li className="lidashboard" id="liexcept" onClick={() => logout()}>
              Log out
            </li>
          </ul>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
