import React, { useEffect, useState } from "react";
import "./Article.css";
import { useNavigate, Link } from "react-router-dom";
import { domain } from "../../config/constants";
import { Rating } from "react-simple-star-rating";

const Article = () => {
  const navigate = useNavigate();
  const [allblogs, SetAllblogs] = useState([]);

  useEffect(() => {
    fetch(`${domain}/blog`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetAllblogs(data);
      });
  }, []);

  return (
    <div>
      {allblogs.map((data) => {
        console.log(data);
        return (
          <div className="wholebox">
            <div class="wrap">
              <div className="box" style={{ position: "relative" }}>
                <img
                  class="blogimg"
                  src={data.imgurl}
                  width={"100%"}
                  height={"100%"}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
                  }}
                />

                <Link to={`/Profile/${data.creator._id}`}>
                  <img
                    className="avatarblog"
                    src={`${domain}/${data.creator.avatar}`}
                    width={"10%"}
                    height={"10%"}
                    onError={(e) => {
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/1057/1057089.png";
                    }}
                  />
                </Link>
                <Rating
                  className="ratingpost"
                  emptyColor="#81e7da"
                  iconsCount={5}
                  size={24}
                  ratingValue={data.averageScore}
                  activecolor="#ffd700"
                  readonly={true}
                />

                <h4 className="userame">{data.creator.name}</h4>
                <div
                  style={{
                    position: "relative",
                    bottom: 170,
                    left: 0,
                    width: "100%",
                  }}
                >
                  <h1>{data.title}</h1>
                  <Link class="hover-2" to={`/blog/${data._id}`}>
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Article;
