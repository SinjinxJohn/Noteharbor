"use client"
import { faAngleDoubleRight, faArrowCircleRight, faCalendar, faChevronCircleDown, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify/dist/components';

export default function TaskPage() {

    const [items, setItems] = useState([]);
    const colors = [
        'bg-red-200',
        'bg-cyan-200',
        'bg-lime-200',
        'bg-yellow-200',
        'bg-sky-200',
        'bg-violet-200',
        'bg-fuchsia-300',
        'bg-rose-200'
    ];

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Shuffle the colors array
    const shuffledColors = shuffle([...colors]);

    const today = new Date();
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday'];
    const month = today.getMonth();
    const todayMonth = months[month];
    const todayDay = days[today.getDate()];
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    // const year = today.getFullYear()%100;

    useEffect(() => {
        const token = window.localStorage.getItem('access_token');
        axios.get('http://127.0.0.1:5000/notes/usernotes', {
            withCredentials: true, headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log('Data:', response.data);
                setItems(response.data.message);
                // console.log(items);
            })
            .catch((error) => {
                console.error('Error data', error);
                // toast.error(error?.response?.data?.error);
            });
    }, []);
    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    };




    const formattedDate = `${todayDay}, ${todayMonth} ${today.getDate()}`
    return (

        <div>
            <div className="relative w-screen h-1/6 overflow-hidden">
                <div className="container w-screen pr-4 h-32" >
                    <img src="/bg-image.svg" alt="Image not loading" className="w-screen h-auto" />
                </div>
                <div className=" flex absolute inset-0 text-white text-3xl font-medium mt-20 pb-9 ml-6 items-center justify-between ">
                    <p>My Tasks</p>

                </div>

            </div>
            <div className='flex justify-between mr-72 items-center'>
                <div>
                    <div className="flex items-center pl-3 pt-5">
                        <p className="font-medium pr-1.5 text-xl">Good Day, Sailor</p>
                        <img src="/waving-hand.svg" className="h-6 w-6"></img>
                    </div>
                    <div className="flex text-sm gap-1 items-center pr-30 pl-3 pt-1 ">
                        <FontAwesomeIcon icon={faSun} className='h-4 w-4 text-red-400 ' />
                        <p className=' pr-80 text-gray-500'>{formattedDate}</p>
                    </div>
                </div>
                <button className="bg-blue-700 hover:bg-blue-600 text-white font-medium py-2 w-32 h-12 rounded">
                    <div className='flex justify-center items-center'>
                        <p>New Task</p>
                        <FontAwesomeIcon icon={faChevronCircleDown} className='pl-2'></FontAwesomeIcon>

                    </div>
                </button>
            </div>

            <div className='flex bg-gray-100 py-1 rounded mr-72 mt-4 h-screen ml-2 pl-3' >
                <div className='flex bg-gray-100 rounded h-auto'>
                <div className='bg-white text-black font-medium py-2 w-72 h-10 rounded ml-1 mt-1 mr-1'>
                    <div className='flex'><p className='pl-3 pr-1'>Todo</p>
                        <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 border border-white border-4"></div></div>
                    {items.filter(note => note.status === "Not Completed").map((note, index) => (
                        <div key={note._id} className="note">
                            <div className={` w-72 h-48 ${shuffledColors[index % shuffledColors.length]} rounded-2xl mt-4 pt-4 px-3`}>
                                <div className='flex justify-between'>
                                    <p className='text-sm '>{new Date(note.due).toLocaleDateString('en-IN', options)}</p>
                                    <FontAwesomeIcon icon={faArrowCircleRight} className='h-6 w-6 text-gray-400 ' />
                                </div>
                                <p className='text-2xl pt-6'>{note.title}</p>
                                <p className='text-gray-500 pt-6 pb-4 text-sm'>{formatTime(note.time.start)}-{formatTime(note.time.end)}</p>



                            </div>
                        </div>
                        
                    ))}

                </div>
                <div className='bg-white text-black font-medium py-2 w-72 h-10 rounded ml-2 mt-1'>
                    <p className='pl-3'>In-Progress</p>
                    {items.filter(note => note.status === "In progress").map((note, index) => (
                        <div key={note._id} className="note">
                            <div className={` w-72 h-48 ${shuffledColors[index % shuffledColors.length]} rounded-2xl mt-4 pt-4 px-3 ml-1`}>
                                <div className='flex justify-between'>
                                    <p className='text-sm '>{new Date(note.due).toLocaleDateString('en-IN', options)}</p>
                                    <FontAwesomeIcon icon={faArrowCircleRight} className='h-6 w-6 text-gray-400 ' />
                                </div>
                                <p className='text-2xl pt-6'>{note.title}</p>
                                <p className='text-gray-500 pt-6 pb-4 text-sm'>{formatTime(note.time.start)}-{formatTime(note.time.end)}</p>



                            </div>
                        </div>
                    ))}

                </div>
                <div className='bg-white text-black font-medium py-2 w-72 h-10 rounded ml-2 mt-1'>
                    <div className='flex'><p className='pl-3 pr-1'>Completed</p>
                        <div className="w-4 h-4 bg-green-500 rounded-full mt-1 border border-white border-4"></div></div>
                    {items.filter(note => note.status === "Completed").map((note, index) => (
                        <div key={note._id} className="note">
                            <div className={` w-72 h-48 ${shuffledColors[index % shuffledColors.length]} rounded-2xl mt-4 pt-4 px-3 ml-1`}>
                                <div className='flex justify-between'>
                                    <p className='text-sm '>{new Date(note.due).toLocaleDateString('en-IN', options)}</p>
                                    <FontAwesomeIcon icon={faArrowCircleRight} className='h-6 w-6 text-gray-400 ' />
                                </div>
                                <p className='text-2xl pt-6'>{note.title}</p>
                                <p className='text-gray-500 pt-6 pb-4 text-sm'>{formatTime(note.time.start)}-{formatTime(note.time.end)}</p>



                            </div>
                        </div>
                    ))}

                
                </div>
                <div className='flex bg-white text-black font-medium py-2 w-72 h-10 rounded ml-2 mt-1'>
                    <p className='pl-3 pr-1'>Overdue</p>
                    {/* <div className="w-4 h-4 bg-green-500 rounded-full mt-1 border border-white border-4"></div> */}
                </div>
            </div>
            </div>


        </div>

    );

}