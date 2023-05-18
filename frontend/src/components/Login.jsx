import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login=()=>{
  const [values,setValues]=React.useState({
    email:'',
    password:''
  })

  const handleOnchange=(event)=>{
    setValues({...values,[event.target.name]:event.target.value})
  }

  const navigate=useNavigate();

  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:5000/login',values)
    .then((res)=>{

      if(res.data.Status==="success"){
        navigate('/home')
      }
      if(res.data.Status==="failed"){
        alert("Wrong Credentials");
      }
    })
    .catch((err)=>console.log(err))

  }
  return(
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login </h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
          <Link to='/register' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Create An Account
          </Link>
        </form>
      </div>
    </div>
  )
}
export default Login