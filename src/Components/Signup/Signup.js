
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import { auth } from "../../Firebase/Firebase.init";
import { signInWithPopup, GoogleAuthProvider,  createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const navigate = useNavigate();

  const[email, setemail] = useState({value:"", error:""});
  const[password, setpassword] = useState({value:"", error:""});
  const[confiramPassword, setconfiramPassword] = useState({value:"", error:""});
  console.log(email);
  console.log(password);
  console.log(confiramPassword);

  const googleauth = () => {

    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
       console.log(user);
      navigate("/");
      toast.success('Successfully created!');
    })
    .catch((error) => {
      const errorMessage = error.message;
       console.log(errorMessage);
    });


  }
  const handleEmail = (emailInput) => {
    if (/^\S+@\S+$/.test(emailInput)) {
       setemail({value:"", error:""})
    }else
    setemail({value:"", error:"Invalid email"});
  }
  const handlePassword = (passwordInput) => {
    if(passwordInput.length <7) {
      setpassword({value:"", error:"Password too short"});
    }else {
      setpassword({value:passwordInput, error:""});
    }
   
  };
  const handleconfiramPassword =(confiramPasswordInput) => {
    if(confiramPasswordInput === password.value) {
      setconfiramPassword({value: confiramPasswordInput,error: "" })
      
    }else{
      setconfiramPassword({value:"",error:"Password mismatched"})
    }
     
    }

  const handlesubmit = (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email.value === "") {
      setemail({ value: "", error: "Email is required" });
    }
    if (password.value === "") {
      setpassword({ value: "", error: "Password is required" });
    }

if (email.value && password.value) {

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
 
    const user = userCredential.user;
    console.log(user);
    
  
  })
  .catch((error) => {
    const errorMessage = error.message;
    toast.error(errorMessage)

    // ..
  });
}


  }





  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Sign Up</h1>
        <form onSubmit={handlesubmit}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input type='email' name='email' id='email' onBlur={(event) => handleEmail(event.target.value)} />
            </div>
            {<p className="error"> {email.error}</p>}
          </div>
        
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input type='password' name='password' id='password' onBlur={(event) => handlePassword (event.target.value)} />
            </div>
            {password.error && <p className="error">{password.error} </p> }
          </div>
        
          <div className='input-field'>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <div className='input-wrapper'>
              <input
                type='password'
                name='confirmPassword'
                id='confirm-password'onBlur={(event) => handleconfiramPassword (event.target.value)}
              />
            </div>
            {<p className="error"> {confiramPassword.error}</p>}
          </div>
          <button type='submit' className='auth-form-submit'>
            Sign Up
          </button>
        </form>
        <p className='redirect'>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div>
        <div className='input-wrapper'>
          <button className='google-auth' onClick={googleauth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
