"use client"
import React, { useState } from 'react';
import HomePage from './page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faList, faCog, faTasks, faTag, faCompass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Dashboard = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className='w-screen h-screen overflow-hidden'>
            <div className='flex w-screen h-screen'>
                <div className='flex flex-col'>
                    <div className="flex items-center pt-6 pl-5">
                        <img src="/notebook.svg" className="pl-1 my-1 h-16 w-16" alt=" "></img>
                        <h6 className="text-xl fg-black font-bold">NoteHarbor</h6>
                    </div>

                    <div className='h-screen w-[14vw] mt-4 ml-10 mb-20 text-gray-700 text-lg'>
                        <div className='flex pt-7 items-center'>
                            <FontAwesomeIcon icon={faCompass} className='h-5 w-5 pr-2' />
                            <p className='text-gray'>Menu</p>
                        </div>
                        <ul className='pt-6 pl-2 flex flex-col gap-3'>
                            <li className={`list-item ${selectedItem === 'tasks' ? 'bg-blue-100 rounded-lg text-blue-600' : 'hover:bg-blue-100 hover:cursor-pointer hover:rounded-lg hover:text-blue-600'} pl-3 pr-3 pb-2 pt-2`} onClick={() => handleItemClick('tasks')}>
                                <Link href='/home/tasks'>
                                    <div className='flex items-center'>
                                        <FontAwesomeIcon icon={faList} className='h-5 w-5' />
                                        <p className='pl-2'>Task List</p>
                                    </div>
                                </Link>
                            </li>
                            <li className={`list-item ${selectedItem === 'projects' ? 'bg-blue-100 rounded-lg text-blue-600' : 'hover:bg-blue-100 hover:cursor-pointer hover:rounded-lg hover:text-blue-600'} pl-3 pr-3 pb-2 pt-2`} onClick={() => handleItemClick('projects')}>
                                <div className='flex items-center'>
                                    <FontAwesomeIcon icon={faTag} className='h-5 w-5' />
                                    <p className='pl-2'>Projects</p>
                                </div>
                            </li>
                            <li className={`list-item ${selectedItem === 'settings' ? 'bg-blue-100 rounded-lg text-blue-600' : 'hover:bg-blue-100 hover:cursor-pointer hover:rounded-lg hover:text-blue-600'} pl-3 pr-3 pb-2 pt-2`} onClick={() => handleItemClick('settings')}>
                                <div className='flex items-center'>
                                    <FontAwesomeIcon icon={faCog} className='h-5 w-5' />
                                    <p className='pl-2'>Settings</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="border-l-2 border-gray ml-4"></div>
                <div className='flex w-screen mr-20'><div className="overflow-auto flex-grow">
                    {props.children}
                </div></div>


            </div>

        </div>
    );
}

export default Dashboard;
