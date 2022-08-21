import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import './Login.css';






const cookies = new Cookies();

export default function Login({hidemodal, showSignUpModal}){

	const navigate = useNavigate()
  const[logname, SetLogname]=useState('');
	const[logpassword,SetLogpassword]=useState('');

	const confirm=()=>{

		if (!logname || !logpassword) return alert('bad input')

		fetch('http://localhost:4000/user/login', {
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: logname,
			password: logpassword,

		}),
	})
	.then(response => response.json())
	.then(data => {
		console.log('Success:', data);
		
		if( data.msg==='bad request: no such user exists'){
			return alert('bad request: no such user exists')
		}
		if(data.msg==='password doesnt match'){
			return alert('password doesnt match')
		}
		if (data.token){


			cookies.set('token', data.token);
			console.log('token')
			// store the token in cookie
			// then navigate to dashboard
			navigate('/dashboard')
		}
		
	})
		.catch((error) => {
			console.error('Error:', error);
	});
	}

 
    



return(
  <>
			{/* modal LOGIN */}
			<div className='modalbox'>
				<div class="login-page">
					<div class="form">
						<form class="register-form">
							<input type="text" placeholder="name"/>
							<input type="password" placeholder="password"/>
							<button>create</button>
							<p class="message">Already registered? <a href="#">Sign In</a></p>
						</form>
						<div class="login-form">
							<input value={logname} onChange={(e) => SetLogname(e.target.value)} type="text" placeholder="username"/>
							<input value={logpassword} onChange={(e) => SetLogpassword(e.target.value)} type="password" placeholder="password"/>
							<button onClick={() => confirm()}>login</button>
							<p class="message">Not registered? 
							<button id='changebtn' onClick={() => {
									hidemodal()
									showSignUpModal()
								}}>Create an account
								</button>
							</p>
							
							
						</div>
					</div>
				</div>
			</div>
			<div onClick={()=>hidemodal()} className='backdrop'>
			</div>
		</>
	)

}