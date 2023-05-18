import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register=()=>{

  const [values,setValues]=React.useState({
    name:'',
    email:'',
    password:''
  })

  const handleOnchange=(event)=>{
    setValues({...values,[event.target.name]:event.target.value})
  }

  const navigate=useNavigate();

  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:5000/register',values)
    .then((res)=>{
      if(res.data.success){
        navigate('/login')
      }
    })
    .catch((err)=>console.log(err))

  }
 

  return(
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}> 
          <div className="mb-3">
            <label htmlFor='name'><strong>Name</strong></label>
            <input type="text" placeholder="Enter Name" name="name"
            onChange={handleOnchange}
            className="form-control rounded-0"/>
          </div>
          <div className="mb-3">
            <label htmlFor='email'><strong>Email</strong></label>
            <input type="email" placeholder="Enter your email" name="email"
             onChange={handleOnchange}
            className="form-control rounded-0"/>
          </div>
          <div className="mb-3">
            <label htmlFor='password'><strong>Password</strong></label>
            <input type="password" placeholder="Enter Name" name="password"
             onChange={handleOnchange}
            className="form-control rounded-0"/>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Sign In
          </Link>
        </form>
      </div>
    </div>
  )
}
export default Register