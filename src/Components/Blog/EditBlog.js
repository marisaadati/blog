import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "universal-cookie";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const editorRef = useRef(null);
  const { _id } = useParams();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [title, SetTitle] = useState("");
  const [blogimg, SetBlogimg] = useState("");
  const [thisblog, SetThisblog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetTitle(data.title);
        SetBlogimg(data.blogimg);
        SetThisblog(data);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  const submit = () => {
    const token = cookies.get("token");
    fetch("http://localhost:4000/blog/edit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        blogId: _id,
        data: {
          title,
          content: editorRef.current.getContent(),
          imgurl: blogimg,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        if (data.error === "bad input") {
          return;
        }

        if (data.error === "Unathorized") {
          return;
        }
        if (data._id) {
          navigate(`./blog/${data._id}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (loading) return <h1>loading.............</h1>;

  return (
    <div className="tinydiv">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={thisblog.content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <input
        placeholder="upload image"
        type="image "
        value={blogimg}
        onChange={(e) => SetBlogimg(e.target.value)}
      />
      <br />
      <input
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => SetTitle(e.target.value)}
      />

      <div class="wrapper">
        <div class="link_wrapper">
          <button className="btnblog" onClick={submit}>
            Post Blog
          </button>
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 268.832 268.832"
            >
              <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
