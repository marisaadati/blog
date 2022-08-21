import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Blog.css'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';





const cookies = new Cookies();

 export default function Blog() {
   const editorRef = useRef(null);
   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };
   const[title, SetTitle]=useState('');
   const[blogimg,SetBlogimg]=useState('');
   const token = cookies.get('token');
   const navigate = useNavigate()


  const submit=()=>{
   fetch('http://localhost:4000/blog/write', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
        'auth': `ut ${token}`
			},
			body: JSON.stringify({
        title,
        content:(editorRef.current.getContent()),
        imgurl : blogimg ,
			}),
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);

					if (data.error === 'bad input') {
						return 
					}

					if (data.error === 'Unathorized') {
						return 
					}

					if (data._id) {  
            // navigate('/blog/._id')
            navigate(`/blog/${data._id}`)
            // navigate('/blog/' + data._id)
					}
				})
				.catch((error) => {
					console.error('Error:', error);
				});

      }



   return (
    <div className='tinydiv'>
       <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
      <input placeholder='upload image' type="image " value={blogimg} onChange={(e) => SetBlogimg(e.target.value)}/>
      <br/>
      <input placeholder='Title' type="text" value={title} onChange={(e) => SetTitle(e.target.value)}/>

      <div class="wrapper">
        <div class="link_wrapper">
          <button className='btnblog' onClick={submit}>Post Blog</button>
             {/* <a href="#">Hover Me!</a> */}
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
              <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
            </svg>
          </div>
        </div>
  
      </div>
      {/* <ReactStars/> */}
    </div>
   );
 }