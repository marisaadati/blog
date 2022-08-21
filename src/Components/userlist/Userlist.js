import React, {useEffect,useState} from "react";
import {domain} from '../../config/constants';
import './Userlist.css';
import { useNavigate , Link } from "react-router-dom";


const Userlist = () => {

  const [allusers, SetAllusers] = useState([])
  
  useEffect(() => {
		fetch(`${domain}/user`)
    .then(res => res.json())
    .then(user => {
      console.log(user)
      SetAllusers(user)
    })
  }, [])



  return (
    <div>
      {
        allusers.map(user=>{
          return(
            <div className="alluserbox">
              <div className="userbox">

                <img className="uimage" src={`${domain}/${user.avatar}`}
                      width={"10%"}
                      height={"10%"}
                      onError={(e) =>{
                      e.target.src="https://cdn-icons-png.flaticon.com/512/1057/1057089.png"}}/>
                <div className="uname">
                  {user.username}
                </div>
                <div className="name-user">
                  {user.name}
                </div>
                  <Link to={`/Profile/${user._id}`}>
                    <button class="button-52" role="button">Profile</button>
                  </Link>

              </div>  


            </div>
          )})

      }
      
    </div>
  );
};

export default Userlist;