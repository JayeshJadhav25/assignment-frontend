import React,{useState} from 'react';
// import './register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useHistory } from 'react-router-dom';



const RegisterPage=()=> { 
    const [formData,setFormData] = useState({
        email:'',
        password:'',
        username:'',
    })
    const { email,password,username } = formData;
    let history = useHistory();

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})

    const onsubmit=async (e) => {
        
            e.preventDefault();
            // console.log(email,password,username)
        
            try {
            const newData = {
                email: email,
                password:password,
                username:username
            }
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }

            const body = JSON.stringify(newData);
            const res = await axios.post('http://localhost:3001/user/register',body , config)

            alert('Registered Succcesfully')
            history.push('/')

        } catch(err) {
            if(err.response.status === 400) {
                alert('Email Id Already Register')
                setFormData({
                    email:'',
                    password:'',
                    username:''
               })
            }
        } 
        
    }

    return (
        <div>
        <section class="container-fluid bg">
        <section class="row justify-content-center">
          <section class="col-12 col-sm-6 col-md-3"> 
            <div class="container">
                <form class="form-container" action="signup_teacher.php" method="POST">
                   
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" 
                         placeholder="Username"
                         required 
                         class="form-control" 
                         id="teacher_name"
                         name="username" 
                         value={username}
                         onChange={e=>onChange(e)}

                         >
                         </input>
                    </div>

                     <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email"
                         placeholder="name@gmail.com"
                         required 
                         class="form-control" 
                         id="exampleInputEmail1" 
                         aria-describedby="emailHelp"
                         name="email"
                         value={email}
                         onChange={e=>onChange(e)}
                         >

                         </input>
                    </div>
                      
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <div class="input-group">
                        <input type="password" 
                         placeholder="**************"
                         required 
                         class="form-control" 
                         data-toggle="password"
                         id="exampleInputPassword1"
                         name="password"
                         value={password}
                         onChange={e=>onChange(e)}
                         />
                    </div>
                   </div>
                   <button type="submit" className="btn btn-danger btn-block" onClick={(e) => onsubmit(e)}>Sign up</button>
                   <hr></hr> <p id="ptext">Already have an account?<Link to='/login' className="btn">login</Link>
                            </p>
                </form>  
            </div>
          </section>
          </section>
          </section>
        </div>
    )
}

export default RegisterPage;

