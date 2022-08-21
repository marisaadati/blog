import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import './Signup.css';
import { useNavigate } from 'react-router-dom';



export default function SignUp({hideSignUpModal, showmodal}){

	const navigate = useNavigate()
const cookies = new Cookies();
const [name, setName] = useState('');
	const [Username, setUsername] = useState('');

	const onsubmit = () => {

		if (!name || !Username) return alert('bad input')

		fetch('http://localhost:4000/user/signup', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				username: Username
			}),
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);

					if (data.error === 'bad input') {
						// ye kari kon
						return 
					}

					if (data.error === 'this username already exists in the database') {
						// ye kar kon
						return 
					}

					if (data.token) {

            cookies.set('token', data.token);
						// store the token in cookie
						// then navigate to dashboard
						navigate('/dashboard')
					}
				})
				.catch((error) => {
					console.error('Error:', error);
				});
	}


	return (
		<>
			<div id='modalexc'  className='modalbox'>
				<div class="login-page">
					<div class="form">
						<form class="register-form">
							<input type="text" placeholder="Username"/>
							<input type="text" placeholder="Name"/>
							<input type="text" placeholder="email address"/>
							<button>create</button>
							
							<p class="message">Already registered? <a href="#">Sign In</a></p>
						</form>
						<div class="login-form">
							<input value={Username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"/>
							<input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name"/>
							<input type="password" placeholder="password"/>
							<button onClick={() => onsubmit()} >Sign Up</button>
							<p class="message">Or <button id='changebtn' onClick={() => {
								showmodal()
								hideSignUpModal()
							}}>Log In</button></p>
						</div>
					</div>
				</div>
			</div>
			{/* <div onClick={()=>hidemodal()} className='backdrop'></div> */}
			<div onClick={()=>hideSignUpModal()} className='backdrop'></div>
		</>
	)
}
