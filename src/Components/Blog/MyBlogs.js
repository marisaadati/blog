import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import "../Profile/Profile.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const MyBlogs = () => {
  const [myblogs, SetMyblogs] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("token");
    fetch(`http://localhost:4000/blog/my-blogs`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetMyblogs(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <div className="cards-wrapper">
        {myblogs.map((data) => {
          console.log(data);
          return (
            <div>
              <Link to={`/dashboard/EditBlog/${data._id}`}>
                <ModeEditIcon className="editicon" />
              </Link>
              <Link class="card" to={`/blog/${data._id}`}>
                <img
                  class="blogimg"
                  src={data.imgurl}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
                  }}
                />
                <div className="blogtitle">
                  <span>{data.title}</span>
                </div>
                <div>
                  <div class="date">6 Oct 2017</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBlogs;
