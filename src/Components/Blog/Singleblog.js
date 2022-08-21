import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { domain } from "../../config/constants";
import "./Singleblog.css";
import Cookies from "universal-cookie";
import ReactStars from "../React stars/ReactStars";
import { Rating } from "react-simple-star-rating";
const cookies = new Cookies();

const Singleblog = () => {
  const [thisarticle, SetThisarticle] = useState(null);
  const { _id } = useParams();
  const [comment, SetComment] = useState([]);
  const [text, SetText] = useState("");
  // const [logedin, SetLogedin] = useState;
  const token = cookies.get("token");

  // ------------------------------------------
  // star rating
  const [score, SetScore] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetThisarticle(data);
      })
      .catch((err) => {});
  }, []);

  // -----------------------------------------------------------------------------------

  useEffect(() => {
    fetch(`http://localhost:4000/comment/by-blog/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetComment(data);
      })
      .catch((err) => {});
    fetchcomments();
  }, []);

  const fetchcomments = () => {
    fetch(`http://localhost:4000/comment/by-blog/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetComment(data);
      })
      .catch((err) => {});
  };

  const sendcomment = () => {
    fetch("http://localhost:4000/comment/submit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        text,
        blogId: _id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        SetScore(data);

        if (data.msg === "ok") return fetchcomments();

        if (data.error === "bad input") {
          return;
        }
        if (data.error === "Unathorized") {
          return;
        }
        if (data.error === "bad request: no such blog found") {
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (!thisarticle || !thisarticle._id) return <h1> loading...</h1>;

  const Blogscore = (ratingValue) => {
    console.log("i run");
    fetch("http://localhost:4000/blog/submit-rate", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        score: ratingValue,
        blogId: _id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("**************************");
        console.log("Success:", data);

        if (data.error === "bad input") {
          return;
        }
        if (data.error === "Unathorized") {
          return;
        }
        if (data.error === "no such blog exists") {
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="page-content">
      <div className="singlebloginfo">
        <Link
          className="authoravatar"
          to={`/Profile/${thisarticle.creator._id}`}
        >
          <img
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/1057/1057089.png";
            }}
            className="singleblogimg"
            src={`${domain}/${thisarticle.creator.avatar}`}
          />
        </Link>
        <Rating
          emptyColor="#81e7da"
          iconsCount={5}
          size={24}
          ratingValue={thisarticle.averageScore}
          activecolor="#ffd700"
          readonly={true}
        />
        <div className="module-info">
          <h1 className="authorname">
            <span className="authorspan">Author: </span>
            {thisarticle.creator.name}{" "}
          </h1>
        </div>
      </div>
      <div className="boxcontent">
        <h4 className="title">{thisarticle.title}</h4>
        <div className="photobox">
          <img
            className="singleblogphoto"
            src={thisarticle.imgurl}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
            }}
          />
        </div>
        <div className="contentbody">
          <div
            className="textborder"
            dangerouslySetInnerHTML={{ __html: thisarticle.content }}
          />
        </div>
      </div>
      <div className="commentbox">
        <label>Feedback</label>
        <Rating
          className="ratingclass"
          iconsCount={5}
          onClick={Blogscore}
          size={24}
          emptyColor="#81e7da"
          activecolor="#ffd700"
        />
        <br />
        <textarea
          className="comment"
          placeholder="Write your comment"
          value={text}
          onChange={(e) => SetText(e.target.value)}
        />
        <button onClick={() => sendcomment()} className="sendbtn">
          <span></span>
        </button>
      </div>
      <br />
      {comment.map((newcomment) => {
        console.log(newcomment);
        return (
          <div className="commentdiv">
            <div>
              <div className="usercomment">{newcomment.user.name} :</div>
              <br />
              {newcomment.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Singleblog;
