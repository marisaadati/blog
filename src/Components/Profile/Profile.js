import {useParams} from "react-router-dom";
import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import {domain} from '../../config/constants';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Profile = () => {
  const [theseBlogs, setTheseBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState(null)
  const {_id} = useParams()


  useEffect(() => {

    const loadData = async () => {
      try {

        const [res1, res2] = await Promise.all([
          fetch(`http://localhost:4000/blog/by-user`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _id,

            }),
          }),
          fetch(`http://localhost:4000/user/singleUser/${_id}`)
        ])

        const [theseBlogs, thisUser] = await Promise.all([
          res1.json(),
          res2.json()
        ])

        setUserInfo(thisUser)
        setTheseBlogs(theseBlogs)
        setLoading(false)
        
      } catch (error) {
        console.log(error)
      }
    }
    loadData()    
  }, [])
  
  
  if (loading) return <h1 > loading... </h1>
  // const response1 = await fetch(`http://localhost:4000/blog/by-user`, {
  //   method: 'POST', // or 'PUT'
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     _id,

  //   }),
  // });

  // const response2 = await fetch(`http://localhost:4000/user/singleUser/${_id}`)
  // const theseBlogs = await response1.json()
  // const thisUser = await response2.json()
  console.log('******************************************')
  console.log(theseBlogs)
  console.log(userInfo)
  console.log('******************************************')




  return ( 
  <div id="mainbox" >
    <div className = 'leftbox'>

       <img className="imageprof" src={`${domain}/${userInfo.avatar}`}
              onError={(e) =>{ 
                e.target.src="https://cdn-icons-png.flaticon.com/512/1057/1057089.png"}}
              />
      <h1 className="username">
        {userInfo.username}
      </h1>
      <h1 className="name">
        {userInfo.name}
      </h1>
      <div>
        <LocationOnIcon className="mapicone"/>
        <p  className="location"> Location</p>
      </div>
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet"></link>
        <button class=" btnhover">Contanct Me</button>

    </div>
    <div className="bottomleft">
      <h1 className="about">About Me</h1>
      <p className="profilebio">
        {userInfo.bio}
      </p>
    </div>


<div className="topright">
    <div className="cards-wrapper">
      {theseBlogs.map(blog=>{
          return(
            <div>
              <Link class="card" to={`/blog/${blog._id}`}>
                <img class="blogimg"
                              src={blog.imgurl} 
                              width={"100%"}
                              height={"100%"}
                              onError={(e) =>{
                              e.target.src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                }}/>
                <div className="blogtitle">
                  <span>{blog.title}</span>   
                </div>
                <div>
                  <div class="date">6 Oct 2017</div>
                </div>
              </Link>
            </div>
          )
        })}
    </div>
  

    </div>

  </div>
  );
};

export default Profile;