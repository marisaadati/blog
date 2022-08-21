import React, {useEffect,useState} from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import {domain} from '../../config/constants'

const Editprofile = () => {
  const [bio,SetBio]=useState('')
  const [namee,SetNamee]=useState()
  const [file, setFile] = useState(null)

  const cookies = new Cookies();
  const token = cookies.get('token')
  const navigate = useNavigate();

  useEffect(() => {
		fetch('http://localhost:4000/user/me', {
			method: 'post', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
        'auth': `ut ${token}`
			},
			body: JSON.stringify({}),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      SetNamee(data.name)
      SetBio(data.bio)
      
    })
  }, [])


  const subedit=()=>{
    fetch('http://localhost:4000/user/edit', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
        'auth': `ut ${token}`
			},
      body: JSON.stringify({
        bio,
        name: namee
      })
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
        if (data.token) {

          cookies.set('token', data.token);
        
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const submitAvatar = async () => {
    try {
      
      if (!file) return alert('please select a file')

      console.log(file)

      const formData = new FormData()
      formData.append('avatar', file)

      fetch('http://localhost:4000/user/update-avatar', {
        method: 'POST',
        headers: {
          'auth': `ut ${token}`
        },
        body: formData
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(data => {
        console.log(data)
      })

    } catch (error) {
    }
  }
	




  console.log('file : ', file)

  return (
    <div style={{paddingLeft: 200}} >

      <div style={{border: '1px solid red', width: '100%', height: 200}}>
        <input 
          type="file" 
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
        />

        <button onClick={submitAvatar} > submit upload </button>
      </div>

      <input type="text" placeholder='Name'
      value={namee}
      onChange={(e)=> SetNamee(e.target.value) }
      />
      <textarea placeholder='Bio'
        onChange={e => SetBio(e.target.value)}
      value={bio}
      />
      
      <button onClick={() => subedit()}>submit</button>



      
    </div>
  );
};

export default Editprofile;