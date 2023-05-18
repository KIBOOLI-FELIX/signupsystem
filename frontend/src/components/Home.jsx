import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
const Home=()=>{
  const[auth,setAuth]=React.useState(false)
  const[message,setMessage]=React.useState('')
  const[name,setName]=React.useState('')

  axios.defaults.withCredentials=true;
  React.useEffect(()=>{
    axios.get('http://localhost:5000/')
    .then((res)=>{
      if(res.data.Status==='success'){
        setAuth(true)
        setName(res.data.name)
        navigate('/login')
      }else{
        setAuth(false)
        setMessage(res.data.Error);
      }
    })
    .catch((err)=>console.log(err))
  },[])
  const handleLogout=()=>{

  }
  return(
    <div className="container mt-4">
      {
        auth?
        <div>
          <h3>You are authorised {name}</h3>
          <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
        </div>
        :
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      }
    </div>
  )
}
export default Home