import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {HiArrowRight, HiUser} from 'react-icons/hi'
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiSettings2Line } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
// import { FiPlus } from 'react-icons/fi'
import { Link, useLocation } from "react-router-dom";
export default function DashSideBoard() {
  const location = useLocation()
  const [tab,setTab] = useState('')
  const [types,setType] = useState([])
  const [activeLink, setActiveLink] = useState('/dashboard?tab=home'); 
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await fetch("http://172.31.99.248:8000/fetch/get_ServiceType/")
      const resData = await res.json()
      console.log(resData)
      setType((prev)=>{
        console.log([...prev,...resData  ])
        return [...prev,...resData]
      })
    }
    fetchData()
  },[])
  useEffect(()=>{
    console.log(types)
    const urlParams = new URLSearchParams(location.search)
    const tab = urlParams.get("tab")
    if(tab){
      setTab(tab)
    }
  },[location.search])
  return (
    <div className="flex flex-col min-h-screen bg-white w-64">
        <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-4">
              <li>
                <Link
                    to={`/dashboard?tab=home`}
                    className={`flex items-center   `}
                    onClick={() => handleLinkClick(`/dashboard?tab=home`)}
                >
                    <a href="#" className={`${activeLink === `/dashboard?tab=home` ? 'bg-purple-500' : ''} hover:bg-gray-300 px-4 py-2 rounded flex w-full`}>
                    <AiFillHome className="w-5 h-5 mr-2" />
                    Home
                    </a>
                </Link>
              </li>
          {types.map((type,index)=>(
              <li key={index}>
                <Link
                    to={`/dashboard?tab=${type.name}&id=${type.id}`}
                    className={`flex items-center   `}
                    onClick={() => handleLinkClick(`/dashboard?tab=${type.name}`)}
                >
                    <a href="#" className={`${activeLink === `/dashboard?tab=${type.name}` ? 'bg-purple-500' : ''} hover:bg-gray-300 px-4 py-2 rounded flex w-full`}>
                    <RiSettings2Line className="w-5 h-5 mr-2" />
                    {type.name}
                    </a>
                </Link>
              </li>
          ))}
            <li>
              <Link
                  to="/dashboard?tab=profile"
                  className={`flex items-center   `}
                  onClick={() => handleLinkClick('/dashboard?tab=profile')}
              >
                  <a href="#" className={`${activeLink === '/dashboard?tab=profile' ? 'bg-purple-500' : ''} hover:bg-gray-300 px-4 py-2 rounded flex w-full`}>
                  <HiUser className="w-5 h-5 mr-2" />
                  Profile
                  </a>
              </Link>
            </li>
            <li>
            <Link
                to="/dashboard?tab=sign-out"
                className={`flex items-center`}
                onClick={() => handleLinkClick('/dashboard?tab=sign-out')}
            >
                <a href="#" className={`text-gray-800  ${activeLink === '/dashboard?tab=sign-out' ? 'bg-purple-500 hover:bg-purple-300' : ''} hover:bg-gray-300 px-4 py-2 rounded flex w-full`}>
                <HiArrowRight className="w-5 h-5 mr-2" />
                  Sign Out
                </a>
            </Link>
            </li>
        </ul>
        </div>
    </div>

  )
}
