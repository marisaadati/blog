import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { domain } from "../config/constants";
import Carousel from "carousel-react-rcdev";
import "./Home.css";

const Home = () => {
  const [bestblog, SetBestblog] = useState([]);
  const [bestwriter, SetBestwriter] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/blog/top-blogs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetBestblog(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/user/top-users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetBestwriter(data);
      });
  }, []);

  return (
    <div>
      <div className="home-title container">
        <img
          className="headerimage"
          src="https://images.unsplash.com/photo-1560092056-5669e776fc68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
        />
        <div className="allspan">
          <p>To Produce Great Content:</p>
          <span className="home-title-span">Pick Your Topic</span>
          <span className="home-title-span">Formulate An Outline</span>
          <span className="home-title-span">Make Content Skimmable</span>
          <span className="home-title-span">Read and Re-read</span>
          <span className="home-title-span">and Posting articles</span>
        </div>
      </div>
      <div className="writertitle"> Best Articles:</div>
      <div className="gridDiv">
        <div class="gridtemplate">
          {bestblog.map((data) => {
            console.log(data);
            return (
              <div className="articles">
                <img
                  class="gridimg"
                  src={data.imgurl}
                  width={"90%"}
                  height={"90%"}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
                  }}
                />
                <Rating
                  emptyColor="#81e7da"
                  iconsCount={5}
                  size={24}
                  ratingValue={data.averageScore}
                  activecolor="#ffd700"
                  readonly={true}
                />

                <Link to={`/blog/${data._id}`}>
                  <h1 className="gridtitle">{data.title}</h1>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="bestarticle">
        {bestblog.map((data) => {
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
                  <Rating
                    className="ratingpost"
                    emptyColor="#81e7da"
                    iconsCount={5}
                    size={24}
                    ratingValue={data.averageScore}
                    activecolor="#ffd700"
                    readonly={true}
                  />
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
      </div> */}
      <div className="mainbox">
        <div className="writertitle">
          <div className="writershover">Best writers:</div>
        </div>

        <div className="bestwriter">
          {bestwriter.map((topauthors) => {
            console.log("***************************");
            console.log(topauthors);
            return (
              <div className="eachwritercard">
                <Link to={`/Profile/${topauthors._id}`}>
                  <img
                    className="topwriteravatar"
                    src={`${domain}/${topauthors.avatar}`}
                    width={100}
                    height={100}
                    onError={(e) => {
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/1057/1057089.png";
                    }}
                  />
                  <h2 className="writername">{topauthors.name}</h2>
                </Link>
              </div>
            );
          })}
        </div>
        <br></br>

        <div></div>
      </div>
    </div>
  );
};

export default Home;
