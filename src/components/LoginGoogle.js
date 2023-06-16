
import { auth, provider, createUserDocument } from "../firebase";
import {useState, navigate} from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";



export default function LoginGoogle() {

  const [user, setUser] = useState(null);
  const uType = "user"
  const navigate = useNavigate(); // function from 'react-router-dom' to change page

   const handleGoogleSignIn=()=>{
    signInWithPopup(auth, provider).then((result)=>{
      const user = result.user;
      console.log(user);
      setUser(user);
      navigate("/")
    }).catch((err)=>{
      console.log(err);
    })
  }

  const handleLogout=()=>{
    setUser(null);
  }

  return (
    <div className="wrapper">
      <div className='box'>
          {user?(
            <>
              <button className='btn btn-secondary btn-md'
                onClick={handleLogout}>
                LOGOUT
              </button>
              <h3>Welcome {user.displayName}</h3>
              <p>{user.email}</p>
              
                {/**
                               <div className='photo'>
                <img src={user.photoURL} alt="dp" referrerPolicy='no-referrer'/>
              </div> 
                 
                 */}
            </>
          ):(
            <button className='btn btn-danger btn-md'
              onClick={handleGoogleSignIn}>
              Sign In With Google
            </button>  
          )} 
      </div>
    </div>
  );
}
