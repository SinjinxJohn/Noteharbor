"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { redirect } from "next/dist/server/api-utils";
import Router, { useRouter } from "next/navigation";


export default function Home() {
  const [emailInput, setemailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const router = useRouter();
  // const router = useRouter();
 

  // const router = useRouter();

  const handleEmailChange = (event) => {
    setemailInput(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordInput(event.target.value);
  };

  const notify = ()=>{
    toast("Hello there");
  }
 

  const handleSubmit = async (event) => {
    
    
    try {
      
        event.preventDefault();

        const response = await axios.post('http://localhost:5000/signup', {
            email: emailInput,
            password: passwordInput,
            confirmPassword: confirmPasswordInput,
        });
        console.log('Server Response:', response);

        // const data = await response.data();
        const data =await response.data;
        toast.success(data.message);
        router.push('/');
        



       
    } catch (error) {
        console.log(error.message);

        // Show an error toast for network or unexpected errors
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
            <p className="font-medium pr-1.5 text-xl">Hi, Welcome to NoteHarbor</p>
            <img src="chick.svg" className="h-6 w-6"></img>
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
        <div className="pt-5">
          <p className="text-base font-medium pb-2">Confirm Password</p>
          <input
            className="rounded-md border-2 border-grey-500 h-10 w-80 p-2 focus:outline-none focus:border-grey-700 focus:shadow-outline-grey"
            type="password"
            id="password"
            value={confirmPasswordInput}
            onChange={handleConfirmPasswordChange} placeholder="Enter your password"></input>
        </div>

        <div className="pt-6">
          <button className="bg-purple-900 hover:bg-purple-800 text-white font-bold py-2 w-80 rounded" onClick={handleSubmit}>Sign up</button>
          <ToastContainer/>
        </div>

        <div className="pt-3 flex">
          <p className="text-xs text-gray-700">Already registered?</p>
          <Link href='/'>
          <p className="text-xs pl-1 text-purple-900 font-medium"
            
          >Sign In</p>
          </Link>

        </div>
        


      </div>
    </div>

  );
}
