import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { useNavigate, Link } from "react-router-dom";
import { domain } from "../../config/constants";

const cookies = new Cookies();

export default () => {
  const navigate = useNavigate();
  const [isvisible, SetIsvisible] = useState(false);

  const showmodal = () => {
    SetIsvisible(true);
  };
  const hidemodal = () => {
    SetIsvisible(false);
  };

  const [isshown, SetIsshown] = useState(false);

  const showSignUpModal = () => {
    SetIsshown(true);
  };
  const hideSignUpModal = () => {
    SetIsshown(false);
  };
  const [profile, SetProfile] = useState(null);
  const [loading, SetLoading] = useState(true);

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
        if (data._id) {
          SetProfile(data);
        }
        SetLoading(false);
      });
  }, []);
  if (loading) return <h1>loading</h1>;

  return (
    <div>
      <header class="header">
        <div class="header__inner">
          <div class="logo">
            <svg width="46" height="33" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0 -.53)" fill="none" fill-rule="evenodd">
                <rect
                  fill="#AEA6E2"
                  transform="rotate(45 29.586 17)"
                  x="17.586"
                  y="5"
                  width="24"
                  height="24"
                  rx="2"
                />
                <path
                  d="m18.414 1.444 14.142 14.142a2 2 0 0 1 0 2.828L18.414 32.556a2 2 0 0 1-2.828 0L1.444 18.414a2 2 0 0 1 0-2.828L15.586 1.444a2 2 0 0 1 2.828 0Zm-.707.707a1 1 0 0 0-1.414 0L2.15 16.293a1 1 0 0 0 0 1.414L16.293 31.85a1 1 0 0 0 1.414 0L31.85 17.707a1 1 0 0 0 0-1.414L17.707 2.15Z"
                  fill="#CBC8E1"
                  fill-rule="nonzero"
                />
              </g>
            </svg>
          </div>
          <nav class="menu">
            <button className="navbtn" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="navbtn" onClick={() => navigate("/Articles")}>
              Articles
            </button>
            <a className="navbtn" onClick={() => navigate("/Userlist")}>
              Users List
            </a>
            <a className="navbtn" href="">
              Contact Us
            </a>
          </nav>
          <nav class="actions">
            <button
              className="ring"
              onClick={() => navigate("/dashboard")}
              aria-label="Setting"
            >
              <svg width="23" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.871 19.694c-.6.456-1.257.838-1.96 1.134V22.5a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-1.672a9.022 9.022 0 0 1-1.96-1.134l-1.45.837a2 2 0 0 1-2.733-.732l-1.5-2.598A2 2 0 0 1 1 14.469l1.45-.837a9.12 9.12 0 0 1 0-2.264L1 10.53A2 2 0 0 1 .268 7.8l1.5-2.598A2 2 0 0 1 4.5 4.469l1.45.837a9.022 9.022 0 0 1 1.96-1.134V2.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.672a9.022 9.022 0 0 1 1.961 1.134l1.45-.837a2 2 0 0 1 2.732.732l1.5 2.598a2 2 0 0 1-.732 2.732l-1.45.837a9.12 9.12 0 0 1 0 2.264l1.45.837a2 2 0 0 1 .732 2.732l-1.5 2.598a2 2 0 0 1-2.732.732l-1.45-.837Zm-5.46-3.018a4.176 4.176 0 1 0 0-8.352 4.176 4.176 0 0 0 0 8.352Z"
                  fill="#CBC8E1"
                  fill-rule="evenodd"
                />
              </svg>
            </button>
            <button className="setting" aria-label="notifs">
              <svg width="21" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.314 2.624a7.003 7.003 0 0 1 5.507 6.84v9h2a1 1 0 0 1 0 2h-18a1 1 0 1 1 0-2h2v-9a7.003 7.003 0 0 1 5.508-6.84A1.01 1.01 0 0 1 9.32 2.5v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1c0 .042-.002.084-.007.124Zm3.507 15.84v-9a5 5 0 0 0-10 0v9h10Zm-6.732 3h3.465a2 2 0 1 1-3.465 0Z"
                  fill="#CBC8E1"
                  fill-rule="nonzero"
                />
              </svg>
            </button>
            <div class="container">
              <div>
                {profile ? (
                  <Link to={"/dashboard/"}>
                    <img
                      onError={(e) => {
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/1057/1057089.png";
                      }}
                      className="avataricon"
                      src={`${domain}/${profile.avatar}`}
                    />
                  </Link>
                ) : (
                  <>
                    <button onClick={() => showmodal()} id="log">
                      Login
                    </button>
                    {isvisible ? (
                      <Login
                        hidemodal={hidemodal}
                        showSignUpModal={showSignUpModal}
                      />
                    ) : null}

                    <button onClick={() => showSignUpModal()} id="reg">
                      Sign up
                    </button>
                    {isshown ? (
                      <>
                        <Signup
                          hideSignUpModal={hideSignUpModal}
                          showmodal={showmodal}
                        />
                      </>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
    // <div class="center"></div>
    // <main class="main">
    //   <div class="hero">
    //     <figure>
    //       {/* <img src="https://images.unsplash.com/photo-1647288384306-7b07f2c417f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" alt=""/> */}
    //     </figure>
    //   </div>
    // </main>
    // <div class="center"></div>
    // </div>
  );
};
