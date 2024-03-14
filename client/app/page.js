"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from 'next/link';
import { ToastContainer,toast  } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";



export default function Home() {
  const [emailInput, setemailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const router = useRouter();
  // const router = useRouter();

  const handleEmailChange = (event) => {
    setemailInput(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleButtonSubmit = async (event) => {
    
    try {
      // console.log('Tapped:', tapped);
      event.preventDefault();

      const response = await axios.post('http://localhost:5000/login', {
        email: emailInput,
        password: passwordInput,
      });

      const serverMessage =await response.data;
      console.log(serverMessage);

      toast.success(serverMessage.message);
      router.push('/home/tasks');
      window.localStorage.setItem('access_token',serverMessage.token);
      
    
    } catch (error) {
      // console.log('Error:', error.message || 'An error occurred');
  
      // Show an error toast
      toast.error(error?.response?.data?.error);
    }
  };
  return (

    <div>
      <div className="flex items-center">
        <img src="notebook.svg" className="pl-3 my-1 h-16 w-16"></img>
        <h6 className="text-xl fg-black font-bold">NoteHarbor</h6>

      </div>
      <hr className="h-1 bg-gray-100"></hr>


      <main className="flex justify-center items-center pt-20 ">
        <div >
          <div className="flex items-center justify-center">
            <p className="font-medium pr-1.5 text-xl">Hi, Welcome Back</p>
            <img src="waving-hand.svg" className="h-6 w-6"></img>
          </div>
          <hr className="bg-white-100 mt-3 w-80"></hr>


        </div>


      </main>

      <div className=" flex flex-col justify-center items-center">
        <div className="pt-6">
          <p className="text-base font-medium pb-2">Email</p>
          <input
            className="rounded-md border-2 border-grey-500 h-10 w-80 p-2 focus:outline-none focus:border-grey-700 focus:shadow-outline-grey"
            type="text"
            id="myInput"
            value={emailInput}
            onChange={handleEmailChange} placeholder="E.g. sinjin.hotlinebling@gmail.com"></input>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center">
        <div className="pt-5">
          <p className="text-base font-medium pb-2">Password</p>
          <input
            className="rounded-md border-2 border-grey-500 h-10 w-80 p-2 focus:outline-none focus:border-grey-700 focus:shadow-outline-grey"
            type="password"
            id="password"
            value={passwordInput}
            onChange={handlePasswordChange} placeholder="Enter your password"></input>
        </div>

        <div className="pt-6">
        <button className="bg-purple-900 hover:bg-purple-800 text-white font-bold py-2 w-80 rounded" onClick={handleButtonSubmit}>Login</button>
        <ToastContainer/>
        </div>

        <div className="pt-3 flex">
          <p className="text-xs text-gray-700">Not registered yet?</p>
          <Link href="/signup">
          <p className="text-xs pl-1 text-purple-900 font-medium">Sign up</p>
          </Link>
        </div>
      </div>
    </div>

  );
}
