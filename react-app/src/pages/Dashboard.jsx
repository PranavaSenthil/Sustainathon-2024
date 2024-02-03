import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSideBoard from "../components/DashSideBoard"
import DashProfile from "../components/DashProfile"
import AdminViewSub from "../components/AdminViewSub"
import AdminAddUSer from "../components/AdminAddSub"
import AdminAddSub from "../components/AdminAddSub"
import NearestSuburbanFinder from "../components/NearestSuburbanFinder"
import Home from "./Home"
import DisplayWorkers from "../components/DisplayWorkers"


export default function Dashboard() {
  const location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tab = urlParams.get("tab")
    if(tab){
      setTab(tab)
    }
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg-2">
        <div>
            <DashSideBoard/>
        </div>
        <div className="flex-1 flex justify-center items-center">
            {tab === "profile" && <DashProfile />}
            {tab === "home" && <Home />}
            {tab !== "profile" && tab!== "home" && <DisplayWorkers/>}
            {/* {tab === "add-sub" && <AdminAddSub />} */}
            {/* {tab === "view-sub" && (
            <div className="p-3 shadow-lg rounded-lg bg-bg max-w-md">
                <AdminViewSub />
            </div> */}
            {/* )} */}
        </div>
    </div>
  )
}
