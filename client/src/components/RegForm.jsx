import React, { useState } from 'react';
import axios from "axios";
// import {useNavigate} from "react-router-dom";

const RegForm = ({setViewSignIn, user, setUser}) => {
  // const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  // const setUser = props.setUser
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const changeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/register`, userInfo, {withCredentials: true})
      .then(res => {
        // instead of using state for the user we can save them in local storage if we would prefer
        localStorage.setItem('usertoken', JSON.stringify(res.data.user));
        setUser(true)
        setViewSignIn(false)
      })
      .catch(err => {
        console.log(err)
        const errorResponse = err.response.data.errors;
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key].message)
        }
        setErrors(errorArray)
        console.log(errors)
      });
  }

  const handleClose = () => {
    setViewSignIn(false)
  }

  return (
    <div>
      <div className="row">
        <form action="" className="col-med-4 offset-2 pt-5" onSubmit={submitHandler}>
          {errors.map((err, index) => 
          <p className='error text-red-400' key={index}>{err}</p>
          )}
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full" name="firstName" id="firstName" placeholder="First Name" onChange={changeHandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full" name="lastName" id="lastName" placeholder="Last Name" onChange={changeHandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full" name="email" id="email" placeholder="Email Address" onChange={changeHandler}/>
          </div>
          <div className="form-group w-full">
            <label htmlFor="password">Password</label>
            <input type="password" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full" name="password" id="password" placeholder="Password" onChange={changeHandler}/>
          </div>
          <div className="form-group w-full">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={changeHandler}/>
          </div>
          <button type='button' onClick={handleClose} className="mr-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 dark:text-black">Cancel</button>
          <button type="submit" className="bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400  dark:bg-green-800 dark:hover:bg-green-700">Register</button>
          
        </form>
      </div>
    </div>
  )
}

export default RegForm