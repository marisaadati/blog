import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebLayout from "./Components/Layout/Weblayout";
import Blog from "./Components/Blog/Blog";
import Article from "./Components/Articles/Article";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import Singleblog from "./Components/Blog/Singleblog";
import Profile from "./Components/Profile/Profile";
import Userlist from "./Components/userlist/Userlist";
import Editprofile from "./Components/Editprofile/Editprofile";
import EditBlog from "./Components/Blog/EditBlog";
import MyBlogs from "./Components/Blog/MyBlogs";
// import { Article } from '@mui/icons-material';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<WebLayout />}>
          <Route path="/" element={<App />} />
          <Route path="Articles" element={<Article />} />
          <Route path="/blog/:_id" element={<Singleblog />} />
          <Route path="/Profile/:_id" element={<Profile />} />
          <Route path="/Userlist" element={<Userlist />} />
        </Route>

        <Route path="/dashboard/" element={<DashboardLayout />}>
          <Route path="blog" element={<Blog />} />
          <Route path="EditBlog/:_id" element={<EditBlog />} />
          <Route path="MyBlogs" element={<MyBlogs />} />
          <Route path="Editprofile" element={<Editprofile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
